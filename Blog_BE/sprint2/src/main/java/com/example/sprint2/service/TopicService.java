package com.example.sprint2.service;

import com.example.sprint2.model.Topic;
import com.example.sprint2.repository.ITopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService implements ITopicService{
    @Autowired
    private ITopicRepository topicRepository;

    @Override
    public Iterable<Topic> getAllTopicByIdCate(Long id) {
        return topicRepository.getAllTopicByIdCate(id);
    }
}
