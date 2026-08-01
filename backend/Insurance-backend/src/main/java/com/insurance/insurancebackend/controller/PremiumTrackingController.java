package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.PremiumTrackingRequest;
import com.insurance.insurancebackend.entity.PremiumTracking;
import com.insurance.insurancebackend.service.PremiumTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/premium")
@CrossOrigin(origins = "http://localhost:5173")
public class PremiumTrackingController {

    @Autowired
    private PremiumTrackingService premiumTrackingService;

    // Save Premium
    @PostMapping
    public PremiumTracking savePremium(@RequestBody PremiumTrackingRequest request) {
        return premiumTrackingService.savePremium(request);
    }

    // Get All Premiums
    @GetMapping
    public List<PremiumTracking> getAllPremiums() {
        return premiumTrackingService.getAllPremiums();
    }

    // Get Premiums By Logged-in User
    @GetMapping("/user/{userId}")
    public List<PremiumTracking> getPremiumsByUserId(
            @PathVariable Long userId) {

        return premiumTrackingService.getPremiumsByUserId(userId);
    }

    // Get Premium By Id
    @GetMapping("/{id}")
    public Optional<PremiumTracking> getPremiumById(@PathVariable Long id) {
        return premiumTrackingService.getPremiumById(id);
    }

    @PutMapping("/{id}")
    public PremiumTracking updatePremium(@PathVariable Long id,
                                         @RequestBody PremiumTrackingRequest request) {

        return premiumTrackingService.updatePremium(id, request);
    }
    // Delete Premium
    @DeleteMapping("/{id}")
    public String deletePremium(@PathVariable Long id) {
        premiumTrackingService.deletePremium(id);
        return "Premium Record Deleted Successfully";
    }
}
