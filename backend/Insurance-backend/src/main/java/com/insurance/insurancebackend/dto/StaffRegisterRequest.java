package com.insurance.insurancebackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter


public class StaffRegisterRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;

    // getters and setters
}
