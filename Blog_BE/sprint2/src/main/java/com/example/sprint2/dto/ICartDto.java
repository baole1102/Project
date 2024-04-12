package com.example.sprint2.dto;

import java.util.Date;

public interface ICartDto {
    Long getId();
    String getNameProduct();
    Long getPrice();
    String getImageProduct();
    Integer getQuantity();
    Date getCreateOrder();
    Boolean getStatus();
    Boolean getConfirm();
    String getName();
    Long getIdUser();
    Integer getQuantityOfProduct();
}
