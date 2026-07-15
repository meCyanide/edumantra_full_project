package com.edumantra.portal.service;

import com.edumantra.portal.dto.AuthUser;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private final ConcurrentHashMap<String, AuthUser> tokens = new ConcurrentHashMap<>();

    public String generateToken(AuthUser user) {
        String token = UUID.randomUUID().toString();
        tokens.put(token, user);
        return token;
    }

    public AuthUser getUserByToken(String token) {
        if (token == null) {
            return null;
        }
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        return tokens.get(token);
    }

    public void removeToken(String token) {
        if (token == null) {
            return;
        }
        if (token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }
        tokens.remove(token);
    }
}
