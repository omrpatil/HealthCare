package com.healthcare.user.service;

public interface EmailService {
    void sendOtpEmail(String toEmail, String otp);
}

