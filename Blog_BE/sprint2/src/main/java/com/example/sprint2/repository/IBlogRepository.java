package com.example.sprint2.repository;

import com.example.sprint2.dto.BlogDTO;
import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.model.Blog;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IBlogRepository extends JpaRepository<Blog, Long> {
    @Query(value = "select b.id as id," +
            "b.title as title," +
            " b.content as content, " +
            "b.create_day as createDay," +
            "u.name as nameUser," +
            "b.viewer as viewer ," +
            "b.image_blog as imageBlog," +
            "u.image as imageUser \n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "where b.is_deleted = 0 and b.status = 0", nativeQuery = true)
    List<IBlogDto> listBlog();

    @Query(value = "select b.id as id," +
            "b.title as title," +
            " b.content as content," +
            " b.create_day as createDay," +
            "u.name as nameUser," +
            "b.viewer as viewer ," +
            "b.image_blog as imageBlog," +
            "u.image as imageUser \n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "where b.is_deleted = 0 and b.status = 0", nativeQuery = true)
    Page<IBlogDto> pageListBlog(Pageable pageable);


    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " u.name as nameUser,b.viewer as viewer,\n" +
            " b.image_blog as imageBlog,\n" +
            " u.image as imageUser,\n" +
            " b.category_id as idCategory\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join category c on b.category_id = c.id\n" +
            "where b.is_deleted = 0 and b.status = 0 and b.category_id = :id", nativeQuery = true)
    Page<IBlogDto> getAllBlogSearch(Pageable pageable, @Param("id") Long id);


    @Query(value = "select b.id as id,b.title as title, b.content as content, \n" +
            "b.create_day as createDay,u.name as nameUser,\n" +
            "b.viewer as viewer ,b.image_blog as imageBlog,\n" +
            "u.image as imageUser,\n" +
            "b.description as description,\n" +
            "b.category_id as idCategory,\n" +
            "b.topic_id as idTopic,\n" +
            "b.user_id as idUser\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join topic t on b.topic_id = t.id\n" +
            "where b.is_deleted = 0 and b.status = 0 and b.id = :id", nativeQuery = true)
    Optional<IBlogDto> findByBlogId(@Param("id") Long id);


    @Transactional
    @Modifying
    @Query(value = "INSERT INTO blog (content,create_day,description,image_blog,title,viewer,category_id,topic_id,user_id) " +
            "VALUES(:#{#blog.content},:#{#blog.createDay},:#{#blog.description},:#{#blog.imageBlog}," +
            ":#{#blog.title},:#{#blog.viewer},:#{#blog.categoryId},:#{#blog.topicId},:#{#blog.userId})", nativeQuery = true)
    void create(BlogDTO blog);

    @Transactional
    @Modifying
    @Query(value = "update blog set content=:#{#blog.content}," +
            "create_day=:#{#blog.createDay},description=:#{#blog.description}," +
            "image_blog=:#{#blog.imageBlog},title=:#{#blog.title},viewer=:#{#blog.viewer}," +
            "category_id=:#{#blog.categoryId},topic_id=:#{#blog.topicId},user_id=:#{#blog.userId} \n" +
            "where id=:#{#blog.id}", nativeQuery = true)
    void editBlog(BlogDTO blog);

    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " u.name as nameUser,\n" +
            " b.viewer as viewer,\n" +
            " b.image_blog as imageBlog,\n" +
            " u.image as imageUser,\n" +
            " b.category_id as idCategory\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join category c on b.category_id = c.id\n" +
            "where b.is_deleted = 0 and b.status = 0 \n" +
            "order by b.viewer desc\n" +
            "limit 5", nativeQuery = true)
    List<IBlogDto> getBlogHighView();

    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " u.name as nameUser,\n" +
            " b.viewer as viewer,\n" +
            " b.image_blog as imageBlog,\n" +
            " u.image as imageUser,\n" +
            " b.category_id as idCategory\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join category c on b.category_id = c.id\n" +
            "where b.is_deleted = 0 and b.status = 0 and date_sub(curdate(), INTERVAL 7 DAY) <= b.create_day\n" +
            "limit 3", nativeQuery = true)
    List<IBlogDto> listBlogCurrent();

    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " u.name as nameUser,b.viewer as viewer,\n" +
            " b.image_blog as imageBlog,\n" +
            " u.image as imageUser,\n" +
            " b.category_id as idCategory\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join category c on b.category_id = c.id\n" +
            "where b.is_deleted = 0 and b.status = 0 and b.topic_id = :id", nativeQuery = true)
    Page<IBlogDto> findBlogByTopic(Pageable pageable, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "update blog set blog.is_deleted = 1 where blog.id = :id", nativeQuery = true)
    void deleteBlog(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "update blog set blog.viewer = :view where blog.id = :idBlog", nativeQuery = true)
    void updateViewer(@Param("idBlog") Long id, @Param("view") int view);


    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " u.name as nameUser,b.viewer as viewer,\n" +
            " b.image_blog as imageBlog,\n" +
            " u.image as imageUser,\n" +
            " b.category_id as idCategory\n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "join category c on b.category_id = c.id\n" +
            "where b.is_deleted = 0 and b.status = 0 and b.category_id = :id \n" +
            "order by b.create_day desc ", nativeQuery = true)
    Page<IBlogDto> manageBlog(Pageable pageable, @Param("id") Long idCate);

    @Query(value = "select b.id as id,b.title as title,\n" +
            " b.content as content, \n" +
            " b.create_day as createDay,\n" +
            " b.image_blog as imageBlog\n" +
            "from blog b \n" +
            "where b.is_deleted = 0 and b.status = 0 and b.user_id = :id", nativeQuery = true)
    Page<IBlogDto> getBlogByIdUser(Pageable pageable, @Param("id") Long idUser);

    @Query(value = "select b.id as id," +
            "b.title as title," +
            " b.content as content, " +
            "b.create_day as createDay," +
            "u.name as nameUser," +
            "b.viewer as viewer ," +
            "b.image_blog as imageBlog," +
            "u.image as imageUser \n" +
            "from blog b \n" +
            "join user u on b.user_id = u.id\n" +
            "where b.is_deleted = 0 and b.status = 0 " +
            "limit 3", nativeQuery = true)
    List<IBlogDto> listBlogForProduct();

    @Query(value = "select * \n " +
            "from blog b \n" +
            "where b.is_deleted = 0  and b.user_id = :idUser", nativeQuery = true)
    Page<Blog> manageBlogUser(Pageable pageable, Long idUser);

}



