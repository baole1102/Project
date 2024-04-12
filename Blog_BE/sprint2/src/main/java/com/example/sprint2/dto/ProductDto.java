package com.example.sprint2.dto;

import com.example.sprint2.model.TypeProduct;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ProductDto {
    Long idProduct;
    Long idUser;
    Long id;
    @NotBlank(message = "Tên không được để rỗng")
    String description;
    @NotBlank(message = "Tên không được để rỗng")
    String imageProduct;
    @NotBlank(message = "Tên không được để rỗng")
    @Size(min = 2, max = 255, message = "Tên phim có độ dài từ 2 đến 255 ký tự")
    String nameProduct;
    Boolean isDeleted;
    @NotBlank(message = "Tên không được để rỗng")
    @Size(min = 2, max = 500, message = "Tên phim có độ dài từ 2 đến 500 ký tự")
    String content;
    int quantity;
    Long price;
    Long typeProductId;

}
