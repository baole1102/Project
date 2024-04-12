package com.example.sprint2.service;

import com.example.sprint2.model.Topic;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ITopicService {
    Iterable<Topic> getAllTopicByIdCate(@Param("id") Long id);

}
