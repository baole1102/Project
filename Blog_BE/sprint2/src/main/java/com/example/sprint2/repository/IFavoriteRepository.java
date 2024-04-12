package com.example.sprint2.repository;

import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Favorite;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IFavoriteRepository extends JpaRepository<Favorite,Long> {
    @Query(value = "select count(*)\n" +
            "from favorite f where f.user_id = :id",nativeQuery = true)
    int countFavorite(@Param("id") Long id);

    @Query(value = "select * \n" +
            "from favorite f \n" +
            "where f.blog_id = :id",nativeQuery = true)
    Favorite checkIdBlogInFavorite(@Param("id") Long idBlog);

    @Transactional
    @Modifying
    @Query(value = "insert into favorite(blog_id,user_id) values(:idBlog,:idUser) ",nativeQuery = true)
    void saveFavorite(Long idBlog,Long idUser);

    void deleteFavoriteByBlog_Id(Long idBlog);

    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " u.name as nameUser,b.viewer as viewer,\n" +
            " b.image_blog as imageBlog,\n" +
            " u.image as imageUser,\n" +
            " f.user_id as idUser\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join favorite f on b.id = f.blog_id\n" +
            "where b.is_deleted = 0 and b.status = 0 and f.user_id = :idUser ",nativeQuery = true)
    Page<IBlogDto> listFavorite(Pageable pageable,@Param("idUser") Long idUser );

    @Query(value = "select count(*) from favorite f where f.blog_id = :idBlog and f.user_id= :idUser",nativeQuery = true)
    Long checkFavoriteForUser(Long idUser,Long idBlog);
}
