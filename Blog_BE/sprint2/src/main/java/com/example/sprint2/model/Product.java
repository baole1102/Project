package com.example.sprint2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "product")
@AllArgsConstructor
@RequiredArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @Column(columnDefinition = "LONGTEXT")
    private String imageProduct;
    private String nameProduct;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    private int quantity;
    private Long price;
    @ManyToOne
    @JoinColumn(name = "type_product_id",referencedColumnName = "id")
    private TypeProduct typeProduct;
}
