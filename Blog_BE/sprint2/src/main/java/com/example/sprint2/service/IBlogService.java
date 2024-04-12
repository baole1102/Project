package com.example.sprint2.service;

import com.example.sprint2.dto.BlogDTO;
import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IBlogService {
    List<IBlogDto> listBlog();

    Optional<IBlogDto> findByBlogId(@Param("id") Long id);

    Page<IBlogDto> getAllBlogSearch(Pageable pageable, Long id);

    Page<IBlogDto> pageListBlog(Pageable pageable);

    void create(BlogDTO blog);

    List<IBlogDto> getBlogHighView();

    List<IBlogDto> listBlogCurrent();

    Page<IBlogDto> findBlogByTopic(Pageable pageable, @Param("id") Long id);

    Blog findById(Long id);

    void editBlog(BlogDTO blog);

    void deleteBlog(@Param("id") Long id);

    Page<IBlogDto> manageBlog(Pageable pageable, @Param("id") Long idCate);

    void updateViewer(Long id, int view);

    Page<IBlogDto> getBlogByIdUser(Pageable pageable,Long idUser);
    List<IBlogDto> listBlogForProduct();
    Page<Blog> manageBlogUser(Pageable pageable, Long idUser);
}
