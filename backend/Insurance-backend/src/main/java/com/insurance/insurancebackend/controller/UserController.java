package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.UserRegisterRequest;
import com.insurance.insurancebackend.entity.User;
import com.insurance.insurancebackend.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.insurance.insurancebackend.dto.LoginRequest;
import com.insurance.insurancebackend.dto.StaffRegisterRequest;
import java.util.List;

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
    @PostMapping("/register-staff")
    public String registerStaff(@RequestBody StaffRegisterRequest request) {

        userService.registerStaff(request);

        return "Staff Registered Successfully";
    }
    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        if (user != null) {
            return user;
        }

        return null;
    }
    @GetMapping("/agents")
    public List<User> getAllAgents() {
        return userService.getAllAgents();
    }
    @GetMapping("/clients")
    public List<User> getAllClients() {
        return userService.getAllClients();
    }
}

