package com.example.sprint2.repository;

import com.example.sprint2.dto.IUserDto;
import com.example.sprint2.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    @Query(value = "select u.* from user u\n" +
            "where u.is_deleted = 0 and u.email = :email limit 1 ", nativeQuery = true)
    User findUserByEmail(@Param("email") String email);

    @Query(value = "select u.* from user u\n" +
            "where u.is_deleted = 0 and u.number = :number limit 1 ", nativeQuery = true)
    User findUserByNumber(@Param("number") String number);

    @Query(value = "select u.* from user u \n" +
            "where u.is_deleted = 0 and u.account = :account limit 1 ", nativeQuery = true)
    User findUserByAccount(String account);

    @Query(value = "select u.* from user u\n" +
            "where u.is_deleted = 0 and u.id = :id ", nativeQuery = true)
    User findUserById(@Param("id") Long idUser);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user (account,email,image,name,number,password,role_id) " +
            "VALUES(:#{#user.username},:#{#user.email},:#{#user.image},:#{#user.name}," +
            ":#{#user.number},:#{#user.password},:role", nativeQuery = true)
    void registerUser(User user, Long role);

    boolean existsByAccount(String account);

    boolean existsByEmail(String email);

    Optional<User> findByAccount(String account);

    @Transactional
    @Modifying
    @Query(value = "UPDATE `blogs`.`user_has_role` SET `role_id` = '3' " +
            "WHERE `user_id` = :id", nativeQuery = true)
    void updateForUser(@Param("id") Long id);

    @Query(value = "select r.name as roleName\n" +
            "             from user u \n" +
            "            join user_has_role uhr on u.id = uhr.user_id\n" +
            "            join role r on r.id = uhr.role_id\n" +
            "            where u.is_deleted = 0 and u.account = :account limit 1", nativeQuery = true)
    String getRoleForUser(String account);

    @Query(value = "select u.id as id,u.image as image, u.name as name, u.number as number, r.name as role, u.email as email\n" +
            "from user u\n" +
            "join user_has_role uhr on uhr.user_id = u.id\n" +
            "join role r on uhr.role_id = r.id \n" +
            "where u.is_deleted = false and u.name like :name",nativeQuery = true)
    Page<IUserDto> getAllUserByAmin(Pageable pageable, String name);

    @Transactional
    @Modifying
    @Query(value = "update user set user.is_deleted = 1 where user.id = :id", nativeQuery = true)
    void deleteAccount(@Param("id") Long id);

    @Query(value = "select sum(c.quantity*p.price)\n" +
            "from product p\n" +
            "join cart c on p.id = c.product_id\n" +
            "where c.user_id = :idUser and c.create_order = :createOrder  and c.status = 1;",nativeQuery = true)
    Long totalOrder(Long idUser, Timestamp createOrder);

    @Query(value = "select sum(c.quantity*p.price)\n" +
            "from product p\n" +
            "join cart c on p.id = c.product_id\n" +
            "where c.user_id = :idUser and c.create_order = :createOrder  and c.status = 1",nativeQuery = true)
    Long total(Long idUser, String createOrder);


}

