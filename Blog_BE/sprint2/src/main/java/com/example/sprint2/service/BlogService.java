package com.example.sprint2.service;

import com.example.sprint2.dto.BlogDTO;
import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Blog;
import com.example.sprint2.repository.IBlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService implements IBlogService{
    @Autowired
    private IBlogRepository blogRepository;

    @Override
    public List<IBlogDto> listBlog() {
        return blogRepository.listBlog();
    }


    @Override
    public Optional<IBlogDto> findByBlogId(Long id) {
        return blogRepository.findByBlogId(id);
    }

    @Override
    public Page<IBlogDto> getAllBlogSearch(Pageable pageable, Long id) {
        return blogRepository.getAllBlogSearch(pageable,id);
    }

    @Override
    public Page<IBlogDto> pageListBlog(Pageable pageable) {
        return blogRepository.pageListBlog(pageable);
    }

    @Override
    public void create(BlogDTO blog) {
        blogRepository.create(blog);
    }

    @Override
    public List<IBlogDto> getBlogHighView() {
        return blogRepository.getBlogHighView();
    }

    @Override
    public List<IBlogDto> listBlogCurrent() {
        return blogRepository.listBlogCurrent();
    }

    @Override
    public Page<IBlogDto> findBlogByTopic(Pageable pageable, Long id) {
        return blogRepository.findBlogByTopic(pageable,id);
    }

    @Override
    public Blog findById(Long id) {
        return blogRepository.findById(id).get();
    }

    @Override
    public void editBlog(BlogDTO blog) {
        blogRepository.editBlog(blog);
    }

    @Override
    public void deleteBlog(Long id) {
        blogRepository.deleteBlog(id);
    }

    @Override
    public Page<IBlogDto> manageBlog(Pageable pageable, Long idCate) {
        return blogRepository.manageBlog(pageable,idCate);
    }

    @Override
    public void updateViewer(Long id, int view) {
        blogRepository.updateViewer(id,view);
    }

    @Override
    public Page<IBlogDto> getBlogByIdUser(Pageable pageable, Long idUser) {
        return blogRepository.getBlogByIdUser(pageable,idUser);
    }

    @Override
    public List<IBlogDto> listBlogForProduct() {
        return blogRepository.listBlogForProduct();
    }

    @Override
    public Page<Blog> manageBlogUser(Pageable pageable, Long idUser) {
        return blogRepository.manageBlogUser(pageable,idUser);
    }

}
