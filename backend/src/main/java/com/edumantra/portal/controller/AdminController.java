package com.edumantra.portal.controller;

import com.edumantra.portal.dto.AuthUser;
import com.edumantra.portal.dto.DashboardStatsDto;
import com.edumantra.portal.model.User;
import com.edumantra.portal.model.Superuser;
import com.edumantra.portal.repository.ClassDetailRepository;
import com.edumantra.portal.repository.SuperuserRepository;
import com.edumantra.portal.repository.UserRepository;
import com.edumantra.portal.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired private UserRepository userRepository;
    @Autowired private SuperuserRepository superuserRepository;
    @Autowired private ClassDetailRepository classDetailRepository;
    @Autowired private TokenService tokenService;

    // ── Dashboard ────────────────────────────────────────────────────────────

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {
        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalUsers(userRepository.countByUseractiveFlagNot("P"));
        stats.setTotalSuperusers(superuserRepository.countBySuperusersactiveflagNot("P"));
        stats.setTotalClassDetails(classDetailRepository.count());
        stats.setPendingApprovals(userRepository.countByUseractiveFlag("P"));

        return ResponseEntity.ok(Map.of(
                "stats", stats,
                "users", userRepository.findAll(),
                "superusers", superuserRepository.findAll(),
                "classes", classDetailRepository.findAll()
        ));
    }

    // ── Users (active) ───────────────────────────────────────────────────────

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUsers() {
        List<Map<String, Object>> users = new ArrayList<>();
        superuserRepository.findAll().forEach(a ->
                users.add(userRow(a.getSuperusersid(), a.getSuperusersname(), a.getSuperusersemailid(),
                        a.getSuperusersphoneno(), a.getSuperusersrole(), a.getSuperusersactiveflag(),
                        a.getSuperusersrequestdate(), "superuser")));
        userRepository.findAll().forEach(a ->
                users.add(userRow(a.getUserid(), a.getUsername(), a.getUseremailid(),
                        a.getUserphonenumber(), a.getUserrole(), a.getUseractiveFlag(),
                        a.getUsercreateTs(), "user")));
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{type}/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable String type, @PathVariable Integer userId,
                                        @RequestBody Map<String, String> body,
                                        HttpServletRequest request) {
        AuthUser current = tokenService.getUserByToken(request.getHeader("Authorization"));
        if (current == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Authentication required"));
        }

        boolean isSuper = "superadmin".equalsIgnoreCase(current.getRole()) || "superuser".equalsIgnoreCase(current.getType());
        boolean isAdmin = "admin".equalsIgnoreCase(current.getRole());

        if ("superuser".equalsIgnoreCase(type)) {
            if (!isSuper) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Only superusers can update superuser accounts"));
            }
            Superuser su = superuserRepository.findById(userId).orElse(null);
            if (su == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Superuser not found"));
            if (body.containsKey("name")) su.setSuperusersname(body.get("name"));
            if (body.containsKey("email")) su.setSuperusersemailid(body.get("email"));
            if (body.containsKey("phone")) su.setSuperusersphoneno(body.get("phone"));
            if (body.containsKey("activeflag")) su.setSuperusersactiveflag(body.get("activeflag"));
            if (body.containsKey("role")) su.setSuperusersrole(body.get("role"));
            su.setSuperusersapprovedate(LocalDateTime.now());
            superuserRepository.save(su);
        } else {
            User u = userRepository.findById(userId).orElse(null);
            if (u == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));

            if (body.containsKey("role")) {
                String requestedRole = body.get("role");
                if (!isRoleChangeAllowed(isSuper, isAdmin, u.getUserrole(), requestedRole)) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(Map.of("error", "Admins can only change teacher accounts to admin role"));
                }
            }

            if (body.containsKey("name")) u.setUsername(body.get("name"));
            if (body.containsKey("email")) u.setUseremailid(body.get("email"));
            if (body.containsKey("phone")) u.setUserphonenumber(body.get("phone"));
            if (body.containsKey("activeflag")) u.setUseractiveFlag(body.get("activeflag"));
            if (body.containsKey("role")) u.setUserrole(body.get("role"));
            u.setUserupdateTs(LocalDateTime.now());
            userRepository.save(u);
        }

        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    }

    @DeleteMapping("/users/{type}/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String type, @PathVariable Integer userId,
                                        HttpServletRequest request) {
        if (!isSuperUser(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only superusers can delete users"));
        }

        if ("superuser".equalsIgnoreCase(type)) {
            if (!superuserRepository.existsById(userId))
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Superuser not found"));
            superuserRepository.deleteById(userId);
        } else {
            if (!userRepository.existsById(userId))
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
            userRepository.deleteById(userId);
        }

        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    // ── Pending Approvals ─────────────────────────────────────────────────────

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingUsers(HttpServletRequest request) {
        if (!isAdminOrSuperUser(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Admins and superusers only"));
        }

        List<Map<String, Object>> pending = new ArrayList<>();
        // Use superusers table as the source of truth for pending admin/teacher signups
        superuserRepository.findBySuperusersactiveflag("P").forEach(su ->
                pending.add(userRow(su.getSuperusersid(), su.getSuperusersname(), su.getSuperusersemailid(),
                        su.getSuperusersphoneno(), su.getSuperusersrole(), su.getSuperusersactiveflag(),
                        su.getSuperusersrequestdate(), "superuser")));
        return ResponseEntity.ok(pending);
    }

    @PostMapping("/approve/{type}/{userId}")
    public ResponseEntity<?> approveUser(@PathVariable String type, @PathVariable Integer userId,
                                         HttpServletRequest request) {
        if (!isAdminOrSuperUser(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Admins and superusers only"));
        }

        AuthUser current = tokenService.getUserByToken(request.getHeader("Authorization"));
        String approverName = current != null ? current.getUsername() : "admin";

        // Approve in superusers table
        Superuser su = superuserRepository.findById(userId).orElse(null);
        if (su == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Pending user not found"));
        su.setSuperusersactiveflag("Y");
        su.setSuperusersapprovedate(LocalDateTime.now());
        su.setSuperusersapproveby(approverName);
        superuserRepository.save(su);

        // Approve in user table (same id)
        User u = userRepository.findById(userId).orElse(null);
        if (u != null) {
            u.setUseractiveFlag("Y");
            u.setUserupdateTs(LocalDateTime.now());
            userRepository.save(u);
        }

        return ResponseEntity.ok(Map.of("message", "User approved successfully"));
    }

    @PostMapping("/reject/{type}/{userId}")
    public ResponseEntity<?> rejectUser(@PathVariable String type, @PathVariable Integer userId,
                                        HttpServletRequest request) {
        if (!isAdminOrSuperUser(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Admins and superusers only"));
        }

        // Remove from both tables
        if (superuserRepository.existsById(userId)) superuserRepository.deleteById(userId);
        if (userRepository.existsById(userId)) userRepository.deleteById(userId);

        return ResponseEntity.ok(Map.of("message", "User rejected and removed successfully"));
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private boolean isSuperUser(HttpServletRequest request) {
        AuthUser current = tokenService.getUserByToken(request.getHeader("Authorization"));
        return current != null &&
                ("superadmin".equalsIgnoreCase(current.getRole()) || "superuser".equalsIgnoreCase(current.getType()));
    }

    private boolean isAdminOrSuperUser(HttpServletRequest request) {
        AuthUser current = tokenService.getUserByToken(request.getHeader("Authorization"));
        if (current == null) return false;
        String role = current.getRole().toLowerCase();
        return "superadmin".equals(role) || "admin".equals(role) || "superuser".equalsIgnoreCase(current.getType());
    }

    private boolean isRoleChangeAllowed(boolean isSuper, boolean isAdmin, String currentRole, String requestedRole) {
        if (isSuper) return true;
        if (!isAdmin) return false;
        String fromRole = currentRole == null ? "" : currentRole.toLowerCase();
        String toRole = requestedRole == null ? "" : requestedRole.toLowerCase();
        return "teacher".equals(fromRole) && "admin".equals(toRole);
    }

    private Map<String, Object> userRow(Integer id, String name, String email, String phone,
                                        String role, String activeflag, Object createdate, String type) {
        return Map.of(
                "id", id,
                "name", name == null ? "" : name,
                "emailid", email == null ? "" : email,
                "phonenumber", phone == null ? "" : phone,
                "role", role == null ? "" : role,
                "activeflag", activeflag == null ? "" : activeflag,
                "createdate", createdate == null ? "" : createdate.toString(),
                "type", type
        );
    }
}
