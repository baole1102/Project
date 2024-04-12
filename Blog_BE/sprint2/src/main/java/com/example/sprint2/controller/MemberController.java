package com.example.sprint2.controller;

import com.example.sprint2.model.Blog;
import com.example.sprint2.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/member")
public class MemberController {
    @Autowired
    private IBlogService blogService;

    @GetMapping("/manageBlog")
    public ResponseEntity<?> manageBlog(@RequestParam(name = "page", defaultValue = "0") int page,
                                        @RequestParam(name = "idUser") Long idUser) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Blog> list = blogService.manageBlogUser(pageable, idUser);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
