package com.insurance.insurancebackend.dto;

import java.time.LocalDate;

public class UserRegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

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

    public UserRegisterRequest(){

    }
    public UserRegisterRequest(String firstName,String lastname, String email, String password,String phone,String address,String city,String state,String zip,String country,LocalDate dateOfBirth,String gender,String occupation,String annualIncome ,String maritalStatus) {
        this.firstName =firstName;
        this.lastName =lastname;
        this.email = email;
        this.password = password;
        this.phone =phone;
        this.address =address;
        this.city =city;
        this.state =state;
        this.zip =zip;
        this.country =country;
        this.dateOfBirth =dateOfBirth;
        this.gender =gender;
        this.occupation =occupation;
        this.annualIncome =annualIncome;
        this.maritalStatus =maritalStatus;

    }
    //-----------------------Name--------------------------
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    //----------------------Email---------------------------

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

   //---------------------password------------------------------
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //-------------------phone----------------------------------
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    //--------------------------Address--------------------------------
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    //---------------------city----------------------------------
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    //------------------------State-----------------------------
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }

    //--------------------zip---------------------------------
    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    //--------------------Country------------------------
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    //--------------------Dateofbirth---------------------
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    //-------------------gender-----------------------------
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    //------------------occupation-----------------------------
    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    //------------------annualIncome-----------------------------
    public String getAnnualIncome() {
        return annualIncome;
    }
    public void setAnnualIncome(String annualIncome) {
        this.annualIncome = annualIncome;
    }

    //----------------martialStatus------------------------------
    public String getMaritalStatus() {
        return maritalStatus;
    }
    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }
}
