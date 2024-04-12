package com.example.sprint2.controller;

import com.example.sprint2.dto.BlogDTO;
import com.example.sprint2.dto.FavoriteDto;
import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Blog;
import com.example.sprint2.model.Favorite;
import com.example.sprint2.service.IBlogService;
import com.example.sprint2.service.IFavoriteService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/favorite")
public class FavoriteController {
    @Autowired
    private IFavoriteService favoriteService;
    @Autowired
    private IBlogService blogService;

    @PostMapping("/count")
    @Transactional
    public ResponseEntity<?> countFavorite(@RequestBody FavoriteDto favoriteDto) {
        Favorite favorite = favoriteService.checkIdBlogInFavorite(favoriteDto.getIdBlog());
        Optional<IBlogDto> blog = blogService.findByBlogId(favoriteDto.getIdBlog());
        int count;
        if (favorite != null) {
            favoriteService.deleteFavoriteByBlog_Id(blog.get().getId());
            count = favoriteService.countFavorite(favoriteDto.getIdUser());
            return new ResponseEntity<>(count, HttpStatus.OK);
        } else {
            favoriteService.saveFavorite(blog.get().getId(), favoriteDto.getIdUser());
            count = favoriteService.countFavorite(favoriteDto.getIdUser());
            return new ResponseEntity<>(count, HttpStatus.OK);
        }
    }

    @GetMapping("/checkCount/{id}")
    public ResponseEntity<?> checkCount(@PathVariable("id") Long id){
        int count = favoriteService.countFavorite(id);
        if(count == 0){
            return new ResponseEntity<>(count,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(count,HttpStatus.OK);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllFavorite(@RequestParam(name = "page") int page,
                                            @RequestParam(name = "idUser") Long id) {
        Pageable pageable = PageRequest.of(page, 6);
        Page<IBlogDto> list = favoriteService.listFavorite(pageable, id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/checkFavorite")
    public ResponseEntity<?> checkFavoriteForUser(@RequestParam Long idUser, @RequestParam Long idBlog){
        Long favorite = favoriteService.checkFavoriteForUser(idUser, idBlog);
        return new ResponseEntity<>(favorite,HttpStatus.OK);
    }
}
