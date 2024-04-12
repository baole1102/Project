package com.example.sprint2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "type_product")
@AllArgsConstructor
@RequiredArgsConstructor
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String typeProduct;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;

}
