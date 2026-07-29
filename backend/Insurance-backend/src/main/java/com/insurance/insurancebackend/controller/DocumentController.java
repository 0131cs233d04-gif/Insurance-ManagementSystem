package com.insurance.insurancebackend.controller;

import com.insurance.insurancebackend.dto.DocumentRequestDTO;
import com.insurance.insurancebackend.entity.Document;
import com.insurance.insurancebackend.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Upload Document
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Document uploadDocument(@ModelAttribute DocumentRequestDTO request) throws IOException {
        return documentService.uploadDocument(request);
    }

    // Get All Documents
    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    // Get Document By Id
    @GetMapping("/{id}")
    public Optional<Document> getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id);
    }

    // Delete Document
    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return "Document deleted successfully.";
    }
}
