package com.example.sprint2.repository;

import com.example.sprint2.model.Topic;
import org.hibernate.Internal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ITopicRepository extends JpaRepository<Topic,Long> {
    @Query(value = "select *\n" +
            "from topic t\n" +
            "where t.category_id = :id and t.is_deleted = false ",nativeQuery = true)
    Iterable<Topic> getAllTopicByIdCate(@Param("id") Long id);

}

