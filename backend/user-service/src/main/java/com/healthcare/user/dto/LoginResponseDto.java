package com.healthcare.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {

    private String accessToken;
    private String refreshToken;

    // ✅ ADD THESE
    private Long userId;
    private String firstName;
    private String role;
}
