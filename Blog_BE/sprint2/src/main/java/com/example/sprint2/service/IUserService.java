package com.example.sprint2.service;

import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.dto.IUserDto;
import com.example.sprint2.model.Product;
import com.example.sprint2.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    User findUserByEmail(String email);
    User findUserByNumber(String number);
    void registerUser(User user, Long role);
    User findUserById( Long idUser);
    String login(String nameAccount,String passWord) throws Exception;
    Optional<User> findByAccount(String account);
    void updateForUser(@Param("id") Long id);
    User findUserByAccount(@Param("account") String account);
    String getRoleForUser(String account);
    Page<IUserDto> getAllUserByAmin(Pageable pageable, String name);
    void deleteAccount(@Param("id") Long id);
    Long totalOrder(Long idUser, Timestamp createOrder);
    void sendMailBooking(User user, List<IProductDto> list, Long total);
    Long total(Long idUser, String createOrder);
    void save(User user);

}
