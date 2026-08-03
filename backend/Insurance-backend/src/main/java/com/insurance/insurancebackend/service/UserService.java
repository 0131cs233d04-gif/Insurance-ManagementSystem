package com.insurance.insurancebackend.service;

import com.insurance.insurancebackend.dto.UserRegisterRequest;
import com.insurance.insurancebackend.repository.CustomerProfileRepository;
import com.insurance.insurancebackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.insurance.insurancebackend.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import com.insurance.insurancebackend.entity.CustomerProfile;
import com.insurance.insurancebackend.dto.StaffRegisterRequest;
import java.util.List;




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

        user.setRole("CLIENT");

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

    public void registerStaff(StaffRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (!request.getRole().equalsIgnoreCase("ADMIN")
                && !request.getRole().equalsIgnoreCase("AGENT")) {

            throw new RuntimeException("Role must be ADMIN or AGENT");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole().toUpperCase());

        userRepository.save(user);

    }
    public User loginUser(String email, String password, String role) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {

            User foundUser = user.get();

            if (passwordEncoder.matches(
                    password,
                    foundUser.getPassword()) && foundUser.getRole().equalsIgnoreCase(role)) {

                return foundUser;
            }
        }

        return null;
    }
    public List<User> getAllAgents() {
        return userRepository.findByRole("AGENT");
    }
    public List<User> getAllClients() {
        return userRepository.findByRole("CLIENT");
    }

}
