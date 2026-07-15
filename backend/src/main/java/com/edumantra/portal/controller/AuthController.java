package com.edumantra.portal.controller;

import com.edumantra.portal.dto.AuthUser;
import com.edumantra.portal.model.Superuser;
import com.edumantra.portal.model.User;
import com.edumantra.portal.repository.SuperuserRepository;
import com.edumantra.portal.repository.UserRepository;
import com.edumantra.portal.service.EmailService;
import com.edumantra.portal.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private SuperuserRepository superuserRepository;
    @Autowired private TokenService tokenService;
    @Autowired private EmailService emailService;
    @Autowired private PasswordEncoder passwordEncoder;   // BCryptPasswordEncoder

    // ── Sign-in ──────────────────────────────────────────────────────────────

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }

        // Try Superuser first — look up by email, then BCrypt-verify the password
        Optional<Superuser> superuser = superuserRepository.findBySuperusersemailid(email);
        if (superuser.isPresent()) {
            Superuser su = superuser.get();
            if (passwordEncoder.matches(password, su.getSuperuserspasswords())) {
                return loginResponse(su.getSuperusersid(), su.getSuperusersname(), su.getSuperusersemailid(),
                        su.getSuperusersrole(), su.getSuperusersactiveflag(), su.getSuperusersphoneno(), "superuser");
            }
        }

        // Try User — same pattern
        Optional<User> user = userRepository.findByUseremailid(email);
        if (user.isPresent()) {
            User u = user.get();
            if (passwordEncoder.matches(password, u.getUserpassword())) {
                return loginResponse(u.getUserid(), u.getUsername(), u.getUseremailid(),
                        u.getUserrole(), u.getUseractiveFlag(), u.getUserphonenumber(), "user");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password"));
    }

    // ── OTP store ─────────────────────────────────────────────────────────────

    private final Map<String, Map<String, Object>> otpStore = new HashMap<>();

    // ── Registration ─────────────────────────────────────────────────────────

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email    = body.get("email");
        String password = body.get("password");
        String name     = body.get("username");
        String role     = body.get("role");
        String phone    = body.getOrDefault("phonenumber", "");

        if (email == null || password == null || name == null || role == null || phone.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Name, email, phone, password and role are required"));
        }

        role = role.toLowerCase();

        // Check for duplicate email across both tables
        if (userRepository.findByUseremailid(email).isPresent()
                || superuserRepository.findBySuperusersemailid(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email is already registered"));
        }

        // Hash the password with BCrypt before persisting
        String hashedPassword = passwordEncoder.encode(password);

        if ("student".equals(role)) {
            // Students are immediately active
            User user = buildUser(name, email, phone, hashedPassword, role, "Y");
            userRepository.save(user);
            emailService.sendWelcomeEmail(email, name);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Registration successful. You can now sign in."));
        }

        if ("teacher".equals(role) || "admin".equals(role)) {
            // Privileged roles require admin approval — save to both tables as pending
            int newId = ThreadLocalRandom.current().nextInt(100000, 999999999);

            // Save to user table (pending)
            User user = buildUser(name, email, phone, hashedPassword, role, "P");
            user.setUserid(newId);
            userRepository.save(user);

            // Save to superusers table (pending) for admin visibility
            Superuser su = new Superuser();
            su.setSuperusersid(newId);
            su.setSuperusersname(name);
            su.setSuperusersemailid(email);
            su.setSuperusersphoneno(phone);
            su.setSuperuserspasswords(hashedPassword);   // store BCrypt hash
            su.setSuperusersrole(role);
            su.setSuperusersactiveflag("P");
            su.setSuperusersrequestdate(LocalDateTime.now());
            superuserRepository.save(su);

            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(Map.of("message",
                            "Registration submitted. Your account is pending admin approval. You will be able to sign in once approved."));
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Invalid role. Allowed roles: student, teacher, admin"));
    }

    // ── Forgot / Reset password ───────────────────────────────────────────────

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }

        Optional<User> user           = userRepository.findByUseremailid(email);
        Optional<Superuser> superuser = superuserRepository.findBySuperusersemailid(email);
        if (user.isEmpty() && superuser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No account found with this email"));
        }

        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(100000, 999999));
        otpStore.put(email.toLowerCase(), Map.of(
                "otp", otp,
                "createdAt", LocalDateTime.now()
        ));

        emailService.sendOtpEmail(email, otp);
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully to your email"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp   = body.get("otp");
        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and OTP are required"));
        }

        Map<String, Object> stored = otpStore.get(email.toLowerCase());
        if (stored == null || !otp.equals(stored.get("otp"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid OTP"));
        }

        return ResponseEntity.ok(Map.of("message", "OTP verified"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String email       = body.get("email");
        String otp         = body.get("otp");
        String newPassword = body.get("newPassword");
        if (email == null || otp == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email, OTP and password are required"));
        }

        Map<String, Object> stored = otpStore.get(email.toLowerCase());
        if (stored == null || !otp.equals(stored.get("otp"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid OTP"));
        }

        // Hash the new password before saving
        String hashedNewPassword = passwordEncoder.encode(newPassword);

        Optional<User> user = userRepository.findByUseremailid(email);
        if (user.isPresent()) {
            User u = user.get();
            u.setUserpassword(hashedNewPassword);
            userRepository.save(u);
        } else {
            Optional<Superuser> superuser = superuserRepository.findBySuperusersemailid(email);
            if (superuser.isPresent()) {
                Superuser su = superuser.get();
                su.setSuperuserspasswords(hashedNewPassword);
                superuserRepository.save(su);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No account found with this email"));
            }
        }

        otpStore.remove(email.toLowerCase());
        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }

    // ── Session management ───────────────────────────────────────────────────

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        tokenService.removeToken(authHeader);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String authHeader) {
        AuthUser user = tokenService.getUserByToken(authHeader);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid session"));
        }
        return ResponseEntity.ok(Map.of(
                "userid",     user.getId(),
                "username",   user.getUsername(),
                "usermail",   user.getEmailid(),
                "userrole",   user.getRole(),
                "activeflag", user.getActiveflag(),
                "type",       user.getType()
        ));
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private User buildUser(String name, String email, String phone,
                           String hashedPassword, String role, String activeFlag) {
        User user = new User();
        user.setUserid(ThreadLocalRandom.current().nextInt(100000, 999999999));
        user.setUsername(name);
        user.setUseremailid(email);
        user.setUserphonenumber(phone);
        user.setUserpassword(hashedPassword);    // already BCrypt-encoded
        user.setUserrole(role);
        user.setUseractiveFlag(activeFlag);
        user.setUsercreateTs(LocalDateTime.now());
        return user;
    }

    private ResponseEntity<?> loginResponse(Integer id, String name, String email,
                                            String role, String activeflag, String phone, String type) {
        if ("P".equalsIgnoreCase(activeflag)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Your account is pending approval by an administrator. Please try again after approval."));
        }
        if ("N".equalsIgnoreCase(activeflag)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Your account has been deactivated. Please contact support."));
        }
        String safeActiveflag = activeflag == null ? "" : activeflag;
        String token = tokenService.generateToken(new AuthUser(id, name, email, role, safeActiveflag, type));
        return ResponseEntity.ok(Map.of(
                "token",      token,
                "userid",     id,
                "username",   name,
                "usermail",   email,
                "userrole",   role,
                "userphone",  phone,
                "activeflag", safeActiveflag,
                "type",       type
        ));
    }
}
