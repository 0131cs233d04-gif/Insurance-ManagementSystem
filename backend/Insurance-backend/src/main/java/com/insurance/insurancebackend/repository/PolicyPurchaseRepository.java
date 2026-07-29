package com.insurance.insurancebackend.repository;

import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

    public interface PolicyPurchaseRepository extends JpaRepository<PolicyPurchase, Long> {
    List<PolicyPurchase> findByCustomer(CustomerProfile customer);
}

