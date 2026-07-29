package com.insurance.insurancebackend.repository;

import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import com.insurance.insurancebackend.entity.PremiumTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PremiumTrackingRepository extends JpaRepository<PremiumTracking, Long> {

    List<PremiumTracking> findByCustomer(CustomerProfile customer);

    List<PremiumTracking> findByPolicyPurchase(PolicyPurchase policyPurchase);

    List<PremiumTracking> findByPaymentStatus(String paymentStatus);

}
