package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.ClaimRequest;
import com.insurance.insurancebackend.entity.Claim;
import com.insurance.insurancebackend.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // Submit Claim
    @PostMapping
    public Claim submitClaim(@RequestBody ClaimRequest request) {
        return claimService.submitClaim(request);
    }

    // Get All Claims
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    // Get Claims By Logged-in User
    @GetMapping("/user/{userId}")
    public List<Claim> getClaimsByUserId(@PathVariable Long userId) {

        return claimService.getClaimsByUserId(userId);
    }

    // Get Claim By Id
    @GetMapping("/{id}")
    public Optional<Claim> getClaimById(@PathVariable Long id) {
        return claimService.getClaimById(id);
    }

    @PutMapping("/{id}/approve")
    public Claim approveClaim(@PathVariable Long id,
                              @RequestParam Double approvedAmount,
                              @RequestParam String assignedAgent) {

        return claimService.approveClaim(id, approvedAmount, assignedAgent);
    }

    @PutMapping("/{id}/reject")
    public Claim rejectClaim(@PathVariable Long id,
                             @RequestParam String rejectionReason,
                             @RequestParam String assignedAgent) {

        return claimService.rejectClaim(id, rejectionReason, assignedAgent);
    }


    // Delete Claim
    @DeleteMapping("/{id}")
    public String deleteClaim(@PathVariable Long id) {
        claimService.deleteClaim(id);
        return "Claim Deleted Successfully";
    }
}