package com.healthcare.user.service.impl;

import com.healthcare.user.repository.UserRepository;
import com.healthcare.user.service.UserService;
import com.healthcare.user.entity.User;
import com.healthcare.user.exception.ResourceNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ CONSTRUCTOR (EmailService REMOVED)
    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= REGISTER =================
    @Override
    public User registerUser(User user) {

        // 🔐 Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ OTP DISABLED COMPLETELY
        user.setOtp(null);
        user.setVerified(true);

        return userRepository.save(user);
    }

    // ================= LOGIN =================
    @Override
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // ❌ NO OTP / NO VERIFIED CHECK

        // 🔐 Password check
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    // ================= GET USER BY ID =================
    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id " + userId));
    }

    // ================= GET USER BY EMAIL =================
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ================= PROFILE IMAGE =================
    @Override
    public void uploadProfileImage(Long userId, byte[] image) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setImage(image);
        userRepository.save(user);
    }

    @Override
    public byte[] getProfileImage(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getImage();
    }
    @Override
    public boolean verifyPassword(String email, String rawPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return passwordEncoder.matches(rawPassword, user.getPassword());
    }


    // ================= GET ALL USERS =================
    @Override
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // ❌ OTP METHODS REMOVED COMPLETELY
}
