package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.dto.ClaimRequest;
import com.insurance.insurancebackend.entity.Claim;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import com.insurance.insurancebackend.repository.ClaimRepository;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;
import com.insurance.insurancebackend.repository.PolicyPurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private CustomerProfileRepository customerProfileRepository;

    @Autowired
    private PolicyPurchaseRepository policyPurchaseRepository;

    // Submit Claim
    public Claim submitClaim(ClaimRequest request) {

        CustomerProfile customer = customerProfileRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        PolicyPurchase policyPurchase = policyPurchaseRepository.findById(request.getPolicyPurchaseId())
                .orElseThrow(() -> new RuntimeException("Policy Purchase Not Found"));

        Claim claim = new Claim();

        claim.setCustomer(customer);
        claim.setPolicyPurchase(policyPurchase);
        claim.setClaimNumber(request.getClaimNumber());
        claim.setClaimType(request.getClaimType());
        claim.setIncidentDate(request.getIncidentDate());
        claim.setClaimDate(request.getClaimDate());
        claim.setClaimedAmount(request.getClaimedAmount());
        claim.setRemarks(request.getRemarks());

        claim.setStatus("PENDING");
        claim.setVerificationStatus("PENDING");
        claim.setPaymentStatus("PENDING");
        claim.setCreatedAt(LocalDateTime.now());
        claim.setUpdatedAt(LocalDateTime.now());

        return claimRepository.save(claim);
    }

    // Get All Claims
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    // Get Claim By Id
    public Optional<Claim> getClaimById(Long id) {
        return claimRepository.findById(id);
    }

    // Delete Claim
    public void deleteClaim(Long id) {
        claimRepository.deleteById(id);
    }
    public Claim approveClaim(Long id, Double approvedAmount, String assignedAgent) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim Not Found"));

        claim.setStatus("APPROVED");
        claim.setVerificationStatus("VERIFIED");
        claim.setApprovedAmount(approvedAmount);
        claim.setAssignedAgent(assignedAgent);
        claim.setPaymentStatus("APPROVED");
        claim.setSettlementDate(java.time.LocalDate.now());
        claim.setUpdatedAt(LocalDateTime.now());

        return claimRepository.save(claim);
    }
    public Claim rejectClaim(Long id, String rejectionReason, String assignedAgent) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim Not Found"));

        claim.setStatus("REJECTED");
        claim.setVerificationStatus("REJECTED");
        claim.setRejectionReason(rejectionReason);
        claim.setAssignedAgent(assignedAgent);
        claim.setUpdatedAt(LocalDateTime.now());

        return claimRepository.save(claim);
    }
}

