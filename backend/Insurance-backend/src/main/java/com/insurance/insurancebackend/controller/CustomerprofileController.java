package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.CustomerProfileRequest;
import com.insurance.insurancebackend.service.CustomerProfileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


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
}
