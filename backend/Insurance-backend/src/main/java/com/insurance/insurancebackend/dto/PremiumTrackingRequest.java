package com.insurance.insurancebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PremiumTrackingRequest {

    private Long customerId;

    private Long policyPurchaseId;

    private Double premiumAmount;

    private LocalDate dueDate;

    private LocalDate paymentDate;

    private String paymentMethod;

    private String transactionId;

    private String paymentStatus;

    private String remarks;
}