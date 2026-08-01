package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.dto.UserRegisterRequest;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;
import com.insurance.insurancebackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.insurance.insurancebackend.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import com.insurance.insurancebackend.entity.CustomerProfile;


@Service
public class UserService {
    private final  UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;
    private final CustomerProfileRepository customerProfileRepository;


    public UserService(UserRepository userRepository,CustomerProfileRepository customerProfileRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.customerProfileRepository = customerProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public void registerUser(UserRegisterRequest request){

        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        CustomerProfile profile = new CustomerProfile();

        profile.setUser(user);
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setState(request.getState());
        profile.setZip(request.getZip());
        profile.setCountry(request.getCountry());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());
        profile.setOccupation(request.getOccupation());
        profile.setAnnualIncome(request.getAnnualIncome());
        profile.setMaritalStatus(request.getMaritalStatus());

        customerProfileRepository.save(profile);

    }
    public User loginUser(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {

            User foundUser = user.get();

            if (passwordEncoder.matches(
                    password,
                    foundUser.getPassword())) {

                return foundUser;
            }
        }

        return null;
    }

}
