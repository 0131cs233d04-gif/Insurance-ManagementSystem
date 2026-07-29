package com.insurance.insurancebackend.controller;


import com.insurance.insurancebackend.dto.PolicyRequestDTO;
import com.insurance.insurancebackend.entity.Policy;
import com.insurance.insurancebackend.service.PolicyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    // CREATE
    @PostMapping
    public ResponseEntity<Policy> createPolicy(@Valid @RequestBody PolicyRequestDTO request) {
        return ResponseEntity.ok(policyService.createPolicy(request));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Policy>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable Long id) {
        return ResponseEntity.ok(policyService.getPolicyById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Policy> updatePolicy(
            @PathVariable Long id,
            @RequestBody PolicyRequestDTO request) {

        return ResponseEntity.ok(policyService.updatePolicy(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable Long id) {
        return ResponseEntity.ok(policyService.deletePolicy(id));
    }
}
