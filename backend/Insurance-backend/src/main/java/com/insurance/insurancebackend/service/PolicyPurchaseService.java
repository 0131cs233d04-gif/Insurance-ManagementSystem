package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.dto.PolicyPurchaseRequest;
import com.insurance.insurancebackend.entity.Policy;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import com.insurance.insurancebackend.repository.PolicyPurchaseRepository;
import com.insurance.insurancebackend.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;

import java.util.List;

@Service
public class PolicyPurchaseService {

    @Autowired
    private PolicyPurchaseRepository policyPurchaseRepository;

    @Autowired
    private PolicyRepository policyRepository;
    public List<PolicyPurchase> getPoliciesByCustomer(Long customerId){

        CustomerProfile customer =
                customerProfileRepository.findById(customerId)
                        .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        return policyPurchaseRepository.findByCustomer(customer);
    }

    @Autowired
    private CustomerProfileRepository customerProfileRepository;


    public PolicyPurchase createPolicyPurchase(PolicyPurchaseRequest request) {

        CustomerProfile customer = customerProfileRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        Policy policy = policyRepository.findById(request.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));


        PolicyPurchase policyPurchase = new PolicyPurchase();

        policyPurchase.setCustomer(customer);
        policyPurchase.setPolicy(policy);
        policyPurchase.setPurchaseDate(request.getPurchaseDate());
        policyPurchase.setPolicyStartDate(request.getPolicyStartDate());
        policyPurchase.setPolicyEndDate(request.getPolicyEndDate());
        policyPurchase.setPremiumAmount(request.getPremiumAmount());
        policyPurchase.setPaymentFrequency(request.getPaymentFrequency());
        policyPurchase.setPaymentStatus(request.getPaymentStatus());
        policyPurchase.setPolicyStatus(request.getPolicyStatus());

        return policyPurchaseRepository.save(policyPurchase);
    }

    public List<PolicyPurchase> getAllPolicyPurchases(){
        return policyPurchaseRepository.findAll();
    }
    public PolicyPurchase getPolicyPurchaseById(Long id) {
        return policyPurchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));
    }



    public PolicyPurchase updatePolicyPurchase(Long id, PolicyPurchaseRequest request) {

        PolicyPurchase policypurchase = policyPurchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));

        CustomerProfile customer = customerProfileRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        Policy policy = policyRepository.findById(request.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));

        policypurchase.setCustomer(customer);
        policypurchase.setPolicy(policy);
        policypurchase.setPurchaseDate(request.getPurchaseDate());
        policypurchase.setPolicyStartDate(request.getPolicyStartDate());
        policypurchase.setPolicyEndDate(request.getPolicyEndDate());
        policypurchase.setPremiumAmount(request.getPremiumAmount());
        policypurchase.setPaymentFrequency(request.getPaymentFrequency());
        policypurchase.setPaymentStatus(request.getPaymentStatus());
        policypurchase.setPolicyStatus(request.getPolicyStatus());

        return policyPurchaseRepository.save(policypurchase);

    }

    public String deletePolicyPurchase(Long id) {

        PolicyPurchase policypurchase = policyPurchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy Not Found"));

        policyPurchaseRepository.delete(policypurchase);

        return "Policy Deleted Successfully";
    }

}
