package com.edumantra.portal.config;

import com.edumantra.portal.dto.AuthUser;
import com.edumantra.portal.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Allow CORS preflight requests (OPTIONS) to bypass auth checks
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();

        // Auth endpoints are public
        if (path.startsWith("/api/auth")) {
            return true;
        }

        // Check token
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Unauthorized: Missing or invalid token\"}");
            response.setContentType("application/json");
            return false;
        }

        AuthUser user = tokenService.getUserByToken(authHeader);
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Unauthorized: Invalid or expired token\"}");
            response.setContentType("application/json");
            return false;
        }

        // Block inactive accounts (activeflag == 'N')
        if (user.getActiveflag() != null && user.getActiveflag().equalsIgnoreCase("N")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\": \"Your account has been deactivated. Please contact support.\"}");
            response.setContentType("application/json");
            return false;
        }

        // Block pending-approval accounts (activeflag == 'P')
        if (user.getActiveflag() != null && user.getActiveflag().equalsIgnoreCase("P")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\": \"Your account is pending approval by an administrator.\"}");
            response.setContentType("application/json");
            return false;
        }

        // Attach user to request context for downstream controllers
        request.setAttribute("currentUser", user);

        String role = user.getRole().toLowerCase();

        // Admin and Superadmin have full access (except sign‑up which is public)
        if ("superadmin".equals(role) || "admin".equals(role)) {
            return true;
        }

        // Teacher can read/write class details and library content
        if ("teacher".equals(role)) {
            if (path.startsWith("/api/classdetails") && !"DELETE".equalsIgnoreCase(request.getMethod())) {
                return true;
            }
            if (path.startsWith("/api/content")) {
                return true;
            }
            // Disallow other admin routes
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\": \"Forbidden: Teachers limited to classdetails and content\"}");
            response.setContentType("application/json");
            return false;
        }

        // Student can only view class details, their own course transactions, and public content
        if ("student".equals(role)) {
            if ("GET".equalsIgnoreCase(request.getMethod()) && (path.startsWith("/api/classdetails") || path.startsWith("/api/studentcourses") || path.startsWith("/api/content"))) {
                return true;
            }
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\": \"Forbidden: Students have read‑only access\"}");
            response.setContentType("application/json");
            return false;
        }

        // Any other role – deny
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("{\"error\": \"Forbidden: Role not recognized\"}");
        response.setContentType("application/json");
        return false;
    }
}
