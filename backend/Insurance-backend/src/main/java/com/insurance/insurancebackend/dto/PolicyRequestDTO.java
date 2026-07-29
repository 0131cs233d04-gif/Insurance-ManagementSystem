package com.insurance.insurancebackend.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PolicyRequestDTO {



    @NotBlank(message = "Policy Name is required")
    private String policyName;
    @NotNull(message = "Premium Amount is required")
    private Double premiumAmount;
    @NotNull(message = "Coverage Amount is required")
    private Double coverageAmount;
    @NotNull(message = "Tenure is required")
    private Integer tenure;
    @NotNull(message = "Start Date is required")
    private LocalDate startDate;
    @NotNull(message = "End Date is required")
    private LocalDate endDate;
    @NotBlank(message = "Status is required")
    private String status;
    private LocalDate createdDate;
    private LocalDate updatedDate;
    private String description;


}
