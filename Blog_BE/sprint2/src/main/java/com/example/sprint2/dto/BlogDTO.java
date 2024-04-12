package com.example.sprint2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

@Data
public class BlogDTO {
    private Long id;
    @NotBlank(message = "Tên không được để rỗng")
    @Size(min = 2, max = 255, message = "Tên blog có độ dài từ 2 đến 255 ký tự")
    private String title;
    @NotBlank(message = "Tên không được để rỗng")
    private String description;
    private int viewer;
    @NotNull(message = "Ngày không được để rỗng")
    private Date createDay;
    @NotBlank(message = "Tên không được để rỗng")
    private String imageBlog;
    @NotBlank(message = "Tên không được để rỗng")
    @Size(min = 2, max = 500, message = "Tên blog có độ dài từ 2 đến 500 ký tự")
    private String content;
    private Boolean isDeleted = false;
    private Boolean status = false;
    private Long topicId;
    private Long categoryId;
    private Long userId;
}
