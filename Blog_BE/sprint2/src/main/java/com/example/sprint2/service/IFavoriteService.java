package com.example.sprint2.service;

import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface IFavoriteService {
    int countFavorite(@Param("id") Long id);
    Favorite checkIdBlogInFavorite(@Param("id") Long idBlog);
    void saveFavorite(Long idBlog,Long idUser);
    void deleteFavoriteByBlog_Id(Long idBlog);
    Page<IBlogDto> listFavorite(Pageable pageable, Long idUser );

    Long checkFavoriteForUser(Long idUser,Long idBlog);

}
