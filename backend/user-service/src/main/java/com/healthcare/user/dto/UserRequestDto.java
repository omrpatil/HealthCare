package com.healthcare.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserRequestDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // ✅ REQUIRED FIELDS
    private String gender;
    private LocalDate dob;
}
