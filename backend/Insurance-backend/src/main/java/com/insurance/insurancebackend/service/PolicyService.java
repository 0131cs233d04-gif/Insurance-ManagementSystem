package com.insurance.insurancebackend.service;


import com.insurance.insurancebackend.dto.PolicyRequestDTO;
import com.insurance.insurancebackend.entity.Policy;
import com.insurance.insurancebackend.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;
    public Policy createPolicy(PolicyRequestDTO request){

    Policy policy = new Policy();
        long count = policyRepository.count() + 1;
        String policyNumber = "POL" + String.format("%03d", count);
        policy.setPolicyNumber(policyNumber);
        policy.setPolicyName(request.getPolicyName());
        policy.setPremiumAmount(request.getPremiumAmount());
        policy.setCoverageAmount(request.getCoverageAmount());
        policy.setTenure(request.getTenure());
        policy.setStartDate(request.getStartDate());
        policy.setEndDate(request.getEndDate());
        policy.setStatus(request.getStatus());
        policy.setDescription(request.getDescription());

        policy.setCreatedAt(LocalDateTime.now());
        policy.setUpdatedAt(LocalDateTime.now());

    return policyRepository.save(policy);
    }
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Policy getPolicyById(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));
    }

    public Policy updatePolicy(Long id, PolicyRequestDTO request) {

        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));

        // update fields...

        return policyRepository.save(policy);
    }

    public String deletePolicy(Long id) {

        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));

        policyRepository.delete(policy);

        return "Policy Deleted Successfully";
    }
}






