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
public class ClaimRequest {

    private Long policyPurchaseId;

    private Long customerId;

    private String claimNumber;

    private String claimType;

    private LocalDate incidentDate;

    private LocalDate claimDate;

    private Double claimedAmount;

    private String remarks;
}
