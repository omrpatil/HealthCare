package com.healthcare.user.controller;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.healthcare.user.entity.User;
import com.healthcare.user.entity.UserRole;
import com.healthcare.user.security.JwtUtil;
import com.healthcare.user.dto.LoginRequestDto;
import com.healthcare.user.dto.LoginResponseDto;
import com.healthcare.user.dto.OtpRequestDto;
import com.healthcare.user.dto.UserRequestDto;
import com.healthcare.user.dto.UserResponseDto;
import com.healthcare.user.service.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    public UserController(UserService userService,
                          JwtUtil jwtUtil,
                          ModelMapper modelMapper) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(
            @RequestBody UserRequestDto dto) {

        User user = modelMapper.map(dto, User.class);
        user.setRole(UserRole.PATIENT);

        User saved = userService.registerUser(user);

        return new ResponseEntity<>(
                modelMapper.map(saved, UserResponseDto.class),
                HttpStatus.CREATED
        );
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @RequestBody LoginRequestDto dto) {

        User user = userService.login(dto.getEmail(), dto.getPassword());

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        LoginResponseDto response = new LoginResponseDto();
        response.setAccessToken(token);
        
     // ✅ ADD THESE 3 LINES
        response.setUserId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setRole(user.getRole().name());

        return ResponseEntity.ok(response);
    }
 // ✅ VERIFY PASSWORD (FOR PAYMENT)
    @PostMapping("/verify-password")
    public ResponseEntity<Boolean> verifyPassword(
            @RequestBody LoginRequestDto dto) {

        boolean isValid = userService.verifyPassword(
            dto.getEmail(),
            dto.getPassword()
        );

        return ResponseEntity.ok(isValid);
    }


}
