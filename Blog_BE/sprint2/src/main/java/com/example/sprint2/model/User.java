package com.example.sprint2.model;

import com.example.sprint2.dto.IUserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "user")
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (unique = true,nullable = false)
    private String account;
    @Column (unique = true,nullable = false)
    private String email;
    @JsonIgnore
    @Column(nullable = false)
    private String password;
    private String number;
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @Column(columnDefinition = "boolean default false")
    private Boolean status = false;
    private String address;

}
