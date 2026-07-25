package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.entity.User;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;
import org.springframework.stereotype.Service;
import com.insurance.insurancebackend.repository.UserRepository;
import com.insurance.insurancebackend.dto.CustomerProfileRequest;

@Service
public class CustomerProfileService {
    private final CustomerProfileRepository customerProfileRepository;
    private final UserRepository userRepository;

    public CustomerProfileService(CustomerProfileRepository customerProfileRepository,UserRepository userRepository) {
        this.customerProfileRepository = customerProfileRepository;
        this.userRepository=userRepository;
    }
    public void save(CustomerProfileRequest customerProfileRequest) {
        User user = userRepository.findById(customerProfileRequest.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CustomerProfile customerProfile = new CustomerProfile();


        customerProfile.setUser(user);
        customerProfile.setPhone(customerProfileRequest.getPhone());
        customerProfile.setAddress(customerProfileRequest.getAddress());
        customerProfile.setCity(customerProfileRequest.getCity());
        customerProfile.setState(customerProfileRequest.getState());
        customerProfile.setZip(customerProfileRequest.getZip());
        customerProfile.setCountry(customerProfileRequest.getCountry());
        customerProfile.setDateOfBirth(customerProfileRequest.getDateOfBirth());
        customerProfile.setGender(customerProfileRequest.getGender());
        customerProfile.setOccupation(customerProfileRequest.getOccupation());
        customerProfile.setAnnualIncome(customerProfileRequest.getAnnualIncome());
        customerProfile.setMaritalStatus(customerProfileRequest.getMaritalStatus());

        customerProfileRepository.save(customerProfile);

    }
}
