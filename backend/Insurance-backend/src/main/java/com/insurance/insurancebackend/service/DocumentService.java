package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.dto.DocumentRequestDTO;
import com.insurance.insurancebackend.entity.Claim;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.Document;
import com.insurance.insurancebackend.entity.PolicyPurchase;
import com.insurance.insurancebackend.repository.ClaimRepository;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;
import com.insurance.insurancebackend.repository.DocumentRepository;
import com.insurance.insurancebackend.repository.PolicyPurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private CustomerProfileRepository customerProfileRepository;

    @Autowired
    private PolicyPurchaseRepository policyPurchaseRepository;

    @Autowired
    private ClaimRepository claimRepository;

    public Document uploadDocument(DocumentRequestDTO request) throws IOException {

        // Fetch Customer
        CustomerProfile customer = customerProfileRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Fetch Policy Purchase
        PolicyPurchase policyPurchase = null;
        if (request.getPolicyPurchaseId() != null) {
            policyPurchase = policyPurchaseRepository.findById(request.getPolicyPurchaseId())
                    .orElseThrow(() -> new RuntimeException("Policy Purchase not found"));
        }

        // Fetch Claim
        Claim claim = null;
        if (request.getClaimId() != null) {
            claim = claimRepository.findById(request.getClaimId())
                    .orElseThrow(() -> new RuntimeException("Claim not found"));
        }

        // Create uploads folder
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";

        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Generate unique file name
        String fileName = UUID.randomUUID() + "_" + request.getFile().getOriginalFilename();

        // Destination file
        File destination = new File(folder, fileName);

        // Save file
        request.getFile().transferTo(destination);

        // Save document details
        Document document = new Document();

        document.setCustomer(customer);
        document.setPolicyPurchase(policyPurchase);
        document.setClaim(claim);

        document.setDocumentName(request.getDocumentName());
        document.setDocumentType(request.getDocumentType());

        document.setFileName(fileName);
        document.setFilePath(destination.getAbsolutePath());
        document.setFileSize(request.getFile().getSize());

        document.setUploadedAt(LocalDateTime.now());

        return documentRepository.save(document);
    }

    // Get All Documents
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // Get Documents By Logged-in User
    public List<Document> getDocumentsByUserId(Long userId) {

        return documentRepository.findByCustomer_User_Id(userId);

    }

    // Get Document By Id
    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    // Delete Document
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}