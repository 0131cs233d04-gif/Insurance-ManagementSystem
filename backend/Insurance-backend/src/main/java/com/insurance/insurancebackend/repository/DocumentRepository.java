package com.insurance.insurancebackend.repository;

import com.insurance.insurancebackend.entity.Claim;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.Document;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByCustomer(CustomerProfile customer);

    List<Document> findByPolicyPurchase(PolicyPurchase policyPurchase);

    List<Document> findByClaim(Claim claim);

    List<Document> findByDocumentType(String documentType);
}