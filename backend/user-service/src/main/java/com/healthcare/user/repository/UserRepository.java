package com.healthcare.user.repository;

import com.healthcare.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    
    Optional<User> findByEmailAndOtp(String email, String otp);


}
