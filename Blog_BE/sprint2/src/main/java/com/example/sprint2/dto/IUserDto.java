package com.example.sprint2.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;

public interface IUserDto {
     Long getId();
     String getAccount();
     String getEmail();

     String getPassword();
     String getNumber();
     String getName();
     String getImage();
     Boolean getIsDeleted() ;
     Boolean getStatus();
     String getAddress();
     String getRole();
}
