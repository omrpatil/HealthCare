package com.healthcare.user.service;

import com.healthcare.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    // ================= AUTH =================
    User registerUser(User user);

    User login(String email, String password);

    User getUserByEmail(String email);

    // ================= USER =================
    User getUserById(Long userId);

    Page<User> getAllUsers(Pageable pageable);

    // ================= PROFILE IMAGE =================
    void uploadProfileImage(Long userId, byte[] image);
    
    boolean verifyPassword(String email, String rawPassword);


    byte[] getProfileImage(Long userId);
}
