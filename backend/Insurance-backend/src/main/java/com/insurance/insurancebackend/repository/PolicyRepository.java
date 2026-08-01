package com.insurance.insurancebackend.repository;


import com.insurance.insurancebackend.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository  extends JpaRepository<Policy,Long> {


}
