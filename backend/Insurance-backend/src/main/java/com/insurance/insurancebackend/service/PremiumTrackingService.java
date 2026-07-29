package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.dto.PremiumTrackingRequest;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import com.insurance.insurancebackend.entity.PremiumTracking;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;
import com.insurance.insurancebackend.repository.PolicyPurchaseRepository;
import com.insurance.insurancebackend.repository.PremiumTrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PremiumTrackingService {

    @Autowired
    private PremiumTrackingRepository premiumTrackingRepository;

    @Autowired
    private CustomerProfileRepository customerProfileRepository;

    @Autowired
    private PolicyPurchaseRepository policyPurchaseRepository;

    public PremiumTracking savePremium(PremiumTrackingRequest request) {

        CustomerProfile customer = customerProfileRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        PolicyPurchase policyPurchase = policyPurchaseRepository.findById(request.getPolicyPurchaseId())
                .orElseThrow(() -> new RuntimeException("Policy Purchase not found"));

        PremiumTracking premium = new PremiumTracking();

        premium.setCustomer(customer);
        premium.setPolicyPurchase(policyPurchase);

        premium.setPremiumAmount(request.getPremiumAmount());
        premium.setDueDate(request.getDueDate());
        premium.setPaymentDate(request.getPaymentDate());
        premium.setPaymentMethod(request.getPaymentMethod());
        premium.setTransactionId(request.getTransactionId());
        premium.setPaymentStatus(request.getPaymentStatus());
        premium.setRemarks(request.getRemarks());

        premium.setCreatedAt(LocalDateTime.now());
        premium.setUpdatedAt(LocalDateTime.now());
        return premiumTrackingRepository.save(premium);
    }

    public List<PremiumTracking> getAllPremiums() {
        return premiumTrackingRepository.findAll();
    }

    public Optional<PremiumTracking> getPremiumById(Long id) {
        return premiumTrackingRepository.findById(id);
    }

    public void deletePremium(Long id) {
        premiumTrackingRepository.deleteById(id);
    }
    public PremiumTracking updatePremium(Long id, PremiumTrackingRequest request) {

        PremiumTracking premium = premiumTrackingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Premium Record Not Found"));

        premium.setPremiumAmount(request.getPremiumAmount());
        premium.setDueDate(request.getDueDate());
        premium.setPaymentDate(request.getPaymentDate());
        premium.setPaymentMethod(request.getPaymentMethod());
        premium.setTransactionId(request.getTransactionId());
        premium.setPaymentStatus(request.getPaymentStatus());
        premium.setRemarks(request.getRemarks());

        premium.setUpdatedAt(LocalDateTime.now());

        return premiumTrackingRepository.save(premium);
    }
}