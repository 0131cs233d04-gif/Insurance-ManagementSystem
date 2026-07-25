package com.insurance.insurancebackend.entity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Policies")
public class Policy {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String policyNumber;
    private String policyName;
    private Double premiumAmount;
    private Double coverageAmount;
    private Integer tenure;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}


