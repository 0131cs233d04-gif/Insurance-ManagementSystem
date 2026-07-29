package com.insurance.insurancebackend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DocumentRequestDTO {

    private Long customerId;

    private Long policyPurchaseId;

    private Long claimId;

    private String documentName;

    private String documentType;

    private MultipartFile file;
}
