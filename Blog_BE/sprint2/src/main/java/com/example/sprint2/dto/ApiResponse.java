package com.example.sprint2.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse <T> {
    private T dataRes;
    private String token;
    private String role;
}
