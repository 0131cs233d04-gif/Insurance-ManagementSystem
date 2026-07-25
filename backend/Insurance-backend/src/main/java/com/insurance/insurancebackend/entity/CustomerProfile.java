package com.insurance.insurancebackend.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name ="customer_profile")
public class CustomerProfile {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name ="user_id")
    private User user;

    private String phone;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String country;
    private LocalDate dateOfBirth;
    private String gender;
    private String occupation;
    private String annualIncome;
    private String maritalStatus;





}
