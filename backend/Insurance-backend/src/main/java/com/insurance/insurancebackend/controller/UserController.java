package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.UserRegisterRequest;
import com.insurance.insurancebackend.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.insurance.insurancebackend.dto.LoginRequest;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/test")
    public String test(){
        return "User Controller Working";
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegisterRequest request){
        userService.registerUser(request);
        return "User Registered Successfully";
    }
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request) {

        boolean success = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        if (success) {
            return "Login Successful";
        } else {
            return "Invalid Email or Password";
        }
    }
}

