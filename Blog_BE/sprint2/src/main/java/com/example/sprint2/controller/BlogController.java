package com.example.sprint2.controller;

import com.example.sprint2.dto.BlogDTO;
import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.service.IBlogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private IBlogService blogService;

    @GetMapping
    public ResponseEntity<?> getAllBlogs(@RequestParam(name = "page") int page) {
        Pageable pageable = PageRequest.of(page,4);
        Page<IBlogDto> list = blogService.pageListBlog(pageable);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        Optional<IBlogDto> blog = blogService.findByBlogId(id);
        if (blog.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        blogService.updateViewer(blog.get().getId(), blog.get().getViewer()+1);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @GetMapping("/highView")
    public ResponseEntity<?> getBlogHighView() {
        List<IBlogDto> list = blogService.getBlogHighView();
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<?> getListBlogCurrent() {
        List<IBlogDto> list = blogService.listBlogCurrent();
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/findBlog")
    public ResponseEntity<?> findBlogByTopic(@RequestParam(name = "id") Long id,
                                             @RequestParam(name = "page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<IBlogDto> list = blogService.findBlogByTopic(pageable, id);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }



}
