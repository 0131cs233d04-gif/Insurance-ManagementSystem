package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.PolicyPurchaseRequest;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import com.insurance.insurancebackend.service.PolicyPurchaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policy-purchases")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyPurchaseController {

    @Autowired
    private PolicyPurchaseService policyPurchaseService;

    // CREATE
    @PostMapping
    public ResponseEntity<PolicyPurchase> createPolicyPurchase(
            @Valid @RequestBody PolicyPurchaseRequest request) {

        return ResponseEntity.ok(
                policyPurchaseService.createPolicyPurchase(request));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<PolicyPurchase>> getAllPolicyPurchases() {

        return ResponseEntity.ok(
                policyPurchaseService.getAllPolicyPurchases());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<PolicyPurchase> getPolicyPurchaseById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                policyPurchaseService.getPolicyPurchaseById(id));
    }
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PolicyPurchase>> getPoliciesByCustomer(
            @PathVariable Long customerId){

        return ResponseEntity.ok(
                policyPurchaseService.getPoliciesByCustomer(customerId)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<PolicyPurchase> updatePolicyPurchase(
            @PathVariable Long id,
            @RequestBody PolicyPurchaseRequest request) {

        return ResponseEntity.ok(
                policyPurchaseService.updatePolicyPurchase(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePolicyPurchase(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                policyPurchaseService.deletePolicyPurchase(id));
    }
}
