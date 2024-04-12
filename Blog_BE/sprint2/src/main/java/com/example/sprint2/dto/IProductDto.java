package com.example.sprint2.dto;

import java.time.LocalDateTime;

public interface IProductDto {
    Long getId();
    String getNameProduct();
    String getImageProduct();
    Long getPrice();
    String getContent();
    String getDescription();
    Integer getQuantity();
    Long getTypeProductId();
    Boolean getBoolean();
    LocalDateTime getCreateOrder();
    Boolean getConfirm();
    Integer getProductQuantity();
}
