package com.insurance.insurancebackend.dto;

import java.time.LocalDate;




public class CustomerProfileRequest {
    private Long user_id;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String country;
    private LocalDate dateOfBirth;
    private String gender;
    private String Occupation;
    private String AnnualIncome;
    private String MaritalStatus;

    public CustomerProfileRequest(){

    }


    public CustomerProfileRequest(Long user_id,
                String phone,
                String address,
                String city,
                String state,
                String zip,
                String country,
                LocalDate dateOfBirth,
                String gender,String Occupation, String AnnualIncome,String MartialStatus) {

            this.user_id = user_id;
            this.phone = phone;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.country = country;
            this.dateOfBirth = dateOfBirth;
            this.gender = gender;
            this.Occupation=Occupation;
            this.AnnualIncome=AnnualIncome;
            this.MaritalStatus=MartialStatus;

        }
        public Long getUser_id() {
        return user_id;
        }
        public void setUser_id(Long user_id) {
        this.user_id = user_id;
        }

        //--------------phone--------------------------
        public String getPhone() {
        return phone;
        }

        public void setPhone(String phone) {
        this.phone = phone;
        }

        //-------------address--------------------------
        public String getAddress() {
        return address;
        }
        public void setAddress(String address) {
        this.address = address;
        }

        //-------------city-----------------------------
        public String getCity() {
        return city;
        }
        public void setCity(String city) {
        this.city = city;
        }

        //-------------state-------------------------
        public String getState() {
        return state;
        }
        public void setState(String state) {
        this.state = state;
        }

        //------------country-/-ZIP--------------------------

        public String getZip() {
        return zip;
        }

        public void setZip(String zip) {
        this.zip = zip;
        }

        public String getCountry(){
        return country;
        }

        public void setCountry(String country) {
        this.country = country;
        }

        //-----------dateofbirth-------------------------
        public LocalDate getDateOfBirth() {
        return dateOfBirth;
        }
        public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        }

        //------------Gender-------------------------------
        public String getGender() {
        return gender;
        }
        public void setGender(String gender) {
        this.gender = gender;
        }

        public String getOccupation() {
        return Occupation;
        }
        public void setOccupation(String occupation) {
        this.Occupation = occupation;
    }

        public String getAnnualIncome() {
        return AnnualIncome;
        }
        public void setAnnualIncome(String annualIncome) {
        this.AnnualIncome= annualIncome;
        }

        public String getMaritalStatus() {
        return MaritalStatus;
        }
        public void setMaritalStatus(String maritalStatus) {
        this.MaritalStatus = maritalStatus;
        }
    }


