package com.example.sprint2.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "cart")
@AllArgsConstructor
@RequiredArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "boolean default false")
    private Boolean status = false;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    private LocalDateTime createOrder;
    private Long totalPrice;
    private int quantity;
    @Column(columnDefinition = "boolean default false")
    private Boolean confirm = false;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;
}
