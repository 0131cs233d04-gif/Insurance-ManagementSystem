package com.insurance.insurancebackend.repository;


import com.insurance.insurancebackend.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CustomerProfileRepository extends JpaRepository<CustomerProfile,Long> {

}
