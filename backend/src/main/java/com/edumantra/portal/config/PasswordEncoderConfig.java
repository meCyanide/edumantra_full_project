package com.edumantra.portal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Provides a BCryptPasswordEncoder bean for the application.
 * BCrypt is a one-way adaptive hash — passwords cannot be "decrypted";
 * instead, the raw password supplied at login is re-hashed and compared
 * against the stored hash using BCryptPasswordEncoder#matches().
 */
@Configuration
public class PasswordEncoderConfig {

    /**
     * Strength 12 gives a good security/performance trade-off.
     * Increase to 13–14 on more powerful hardware if desired.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
