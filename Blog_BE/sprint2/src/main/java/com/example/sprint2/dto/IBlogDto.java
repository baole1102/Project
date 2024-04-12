package com.example.sprint2.dto;

import java.util.Date;

public interface IBlogDto {
    Long getId();
    String getTitle();
    String getContent();
    Date getCreateDay();
    String getNameUser();
    Integer getViewer();
    String getImageBlog();
    String getImageUser();
    String getDescription();
    Long getIdCategory();
    Long getIdTopic();
    Long getIdUser();

}
