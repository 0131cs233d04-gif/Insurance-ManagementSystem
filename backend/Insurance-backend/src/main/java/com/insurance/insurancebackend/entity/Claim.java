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
@Table(name = "Claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String claimNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerProfile customer;

    @ManyToOne
    @JoinColumn(name = "policy_purchase_id")
    private PolicyPurchase policyPurchase;

    private String claimType;

    private LocalDate incidentDate;

    private LocalDate claimDate;

    private Double claimedAmount;

    private Double approvedAmount;

    private String status;
    // Pending, Under Review, Approved, Rejected, Paid

    private String verificationStatus;
    // Pending, Verified

    private String assignedAgent;

    private String paymentStatus;
    // Pending, Paid

    private LocalDate settlementDate;

    @Column(length = 1000)
    private String remarks;

    @Column(length = 1000)
    private String rejectionReason;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
