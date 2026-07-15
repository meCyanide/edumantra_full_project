package com.edumantra.portal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public boolean sendOtpEmail(String to, String otp) {
        return sendMail(to, "EduMantra Password Reset OTP", "Your EduMantra password reset OTP is: " + otp + "\n\nIt will expire soon. If you did not request this, you can ignore this email.");
    }

    public boolean sendWelcomeEmail(String to, String name) {
        return sendMail(to, "Welcome to EduMantra", "Hi " + name + ",\n\nYour account has been created successfully. You can now sign in to EduMantra and continue your learning journey.");
    }

    public boolean sendMail(String to, String subject, String body) {
        if (mailSender == null) {
            logger.info("Email sending is not configured. To: {} | Subject: {} | Body: {}", to, subject, body);
            return true;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            return true;
        } catch (Exception ex) {
            logger.warn("Failed to send email to {}: {}", to, ex.getMessage());
            return false;
        }
    }
}
