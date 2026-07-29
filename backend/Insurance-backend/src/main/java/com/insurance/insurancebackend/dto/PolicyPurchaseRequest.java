package com.insurance.insurancebackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class PolicyPurchaseRequest {

    private Long customerId;
    private Long policyId;
    private LocalDate purchaseDate;
    private LocalDate policyStartDate;
    private LocalDate policyEndDate;
    private Double premiumAmount;
    private String paymentFrequency;
    private String paymentStatus;
    private String policyStatus;


}
