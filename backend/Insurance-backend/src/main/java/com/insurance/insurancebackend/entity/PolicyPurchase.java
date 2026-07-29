package com.insurance.insurancebackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name= "policy_Purchase")
public class PolicyPurchase {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    // Customer
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerProfile customer;

    // Policy
    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

    // Purchase Details
    private LocalDate purchaseDate;

    private LocalDate policyStartDate;

    private LocalDate policyEndDate;

    private Double premiumAmount;

    private String paymentFrequency; // Monthly, Quarterly, Yearly

    private String paymentStatus; // PAID, PENDING

    private String policyStatus; // ACTIVE, EXPIRED, CANCELLED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }




}
