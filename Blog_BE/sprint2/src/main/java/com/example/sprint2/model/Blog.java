package com.example.sprint2.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "blog")
@AllArgsConstructor
@RequiredArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private int viewer;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date createDay;
    @Column(columnDefinition = "LONGTEXT")
    private String imageBlog;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @Column(columnDefinition = "boolean default false")
    private Boolean status = false;

    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "topic_id",referencedColumnName = "id")
    private Topic topic;
}
