package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.CustomerProfileRequest;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.service.CustomerProfileService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/profile")
public class CustomerprofileController {

    private final CustomerProfileService customerProfileService;

    public CustomerprofileController(CustomerProfileService customerProfileService) {
        this.customerProfileService = customerProfileService;

    }
    @PostMapping
    public String saveProfile(@RequestBody CustomerProfileRequest customerProfileRequest) {

        customerProfileService.save(customerProfileRequest);

        return "Customer Profile Saved Successfully";
    }
    @GetMapping("/{userId}")
    public CustomerProfile getProfile(@PathVariable Long userId) {

        return customerProfileService.getProfile(userId);

    }
    @GetMapping("/all")
    public List<CustomerProfile> getAllProfiles() {
        return customerProfileService.getAllProfiles();
    }
}
