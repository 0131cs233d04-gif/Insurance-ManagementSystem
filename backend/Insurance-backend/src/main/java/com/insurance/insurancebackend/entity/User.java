package com.insurance.insurancebackend.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;


    // --------------------------------------------------------------@column(nullable = false - it stop when the value is null but it didnt stop empty string)
    @Column(name = "first_name",nullable = false)
    @NotBlank                                                       //@NotBlank- it check request comes from spring boot ,it regect blank and space.
    private String firstName;

    @Column(name = "last_name",nullable = false)
    private String lastName;

    @Column(unique = true ,nullable = false)
    @NotBlank(message = "please enter a valid email")
    @Email(message = "please enter a valid email")
    private String email;


    @Column(nullable = false)
    @NotBlank
    @Size(min = 8,max = 60, message = "Password must be between 8 and 20 characters")
    @JsonProperty
            (access = JsonProperty.Access.WRITE_ONLY)
    private String password;

}
