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
@Table(name = "premium_tracking")
public class PremiumTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Customer
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerProfile customer;

    // Purchased Policy
    @ManyToOne
    @JoinColumn(name = "policy_purchase_id")
    private PolicyPurchase policyPurchase;

    // Premium Details
    private Double premiumAmount;

    private LocalDate dueDate;

    private LocalDate paymentDate;

    private String paymentMethod;
    // UPI, Card, Net Banking, Cash

    private String transactionId;

    private String paymentStatus;
    // PAID, PENDING, FAILED

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}