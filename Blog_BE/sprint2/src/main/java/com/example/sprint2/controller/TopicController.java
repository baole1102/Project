package com.example.sprint2.controller;

import com.example.sprint2.model.Topic;
import com.example.sprint2.service.ITopicService;
import org.hibernate.Internal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/topic")
public class TopicController {
    @Autowired
    private ITopicService topicService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllTopic(@PathVariable Long id){
        Iterable<Topic> list = topicService.getAllTopicByIdCate(id);
        if (list == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
