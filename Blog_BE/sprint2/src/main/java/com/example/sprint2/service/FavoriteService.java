package com.example.sprint2.service;

import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Favorite;
import com.example.sprint2.repository.IFavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService implements IFavoriteService{
    @Autowired
    private IFavoriteRepository favoriteRepository;

    @Override
    public int countFavorite(Long id) {
        return favoriteRepository.countFavorite(id);
    }

    @Override
    public Favorite checkIdBlogInFavorite(Long idBlog) {
        return favoriteRepository.checkIdBlogInFavorite(idBlog);
    }

    @Override
    public void saveFavorite(Long idBlog, Long idUser) {
        favoriteRepository.saveFavorite(idBlog,idUser);
    }

    @Override
    public void deleteFavoriteByBlog_Id(Long idBlog) {
        favoriteRepository.deleteFavoriteByBlog_Id(idBlog);
    }

    @Override
    public Page<IBlogDto> listFavorite(Pageable pageable, Long idUser) {
        return favoriteRepository.listFavorite(pageable,idUser);
    }

    @Override
    public Long checkFavoriteForUser(Long idUser, Long idBlog) {
        return favoriteRepository.checkFavoriteForUser(idUser,idBlog);
    }
}
