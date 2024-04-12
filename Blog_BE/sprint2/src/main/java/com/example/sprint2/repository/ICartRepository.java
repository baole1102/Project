package com.example.sprint2.repository;

import com.example.sprint2.dto.ICartDto;
import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.model.Cart;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO `blogs`.`cart` (`product_id`, `user_id`,`quantity`) VALUES (:idProduct, :idUser,1)", nativeQuery = true)
    void addToCart(Long idProduct, Long idUser);

    @Query(value = "select * from cart c where c.product_id =:idProduct and c.user_id =:idUser and c.status = false", nativeQuery = true)
    List<Cart> findByProduct(@Param("idProduct") Long idProduct, @Param("idUser") Long idUser);

    @Query(value = "select * from cart c where c.product_id =:idProduct and c.user_id =:idUser and c.status = false", nativeQuery = true)
    Cart getCartByIdProductAndIdUser(@Param("idProduct") Long idProduct, @Param("idUser") Long idUser);

    @Query(value = "select  p.id as id,p.name_product as nameProduct,\n" +
            "p.price as price, p.image_product as imageProduct,p.quantity as quantityOfProduct,\n" +
            "c.quantity\n" +
            "from product p\n" +
            "join cart c on p.id = c.product_id\n" +
            "where c.user_id = :idUser and p.is_deleted = 0 and c.status = false", nativeQuery = true)
    List<ICartDto> listCart(@Param("idUser") Long idUser);

    @Query(value = "select sum(c.quantity*p.price)\n" +
            "from product p\n" +
            "join cart c on p.id = c.product_id\n" +
            "where c.user_id = :idUser and p.is_deleted = 0 and c.status=false", nativeQuery = true)
    Long totalPrice(@Param("idUser") Long idUser);

    @Transactional
    @Modifying
    @Query(value = "UPDATE `blogs`.`cart` SET `status` = true,`create_order` = :date WHERE cart.user_id =:idUser and cart.status = false", nativeQuery = true)
    void paymentCart(@Param("idUser") Long idUser, String date);


    @Query(value = "select count(*) \n" +
            "from cart c \n" +
            "where c.user_id = :idUser and c.status = false", nativeQuery = true)
    Long countCart(@Param("idUser") Long idUser);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart c WHERE c.product_id =:idProduct and c.user_id = :idUser and c.status = false", nativeQuery = true)
    void deleteCart(Long idProduct, Long idUser);

    @Query(value = "select max(c.create_order) as createOrder, " +
            "max(c.confirm) as confirm," +
            "max(c.status) as status\n" +
            "from cart c \n" +
            "where c.user_id = :idUser and c.status = 1\n" +
            "group by c.create_order \n" +
            "order by c.create_order desc ", nativeQuery = true)
    Page<ICartDto> historyProduct(Pageable pageable, Long idUser);

    @Query(value = "select max(c.create_order) as createOrder, \n" +
            "max(c.confirm) as confirm,\n" +
            "max(u.name) as name,\n" +
            "max(c.status) as status,\n" +
            "max(u.id) as idUser\n" +
            "from cart c \n" +
            "join user u on c.user_id = u.id\n" +
            "where c.status = 1\n" +
            "group by c.create_order", nativeQuery = true)
    Page<ICartDto> listOrderForAdmin(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE `blogs`.`cart` SET `confirm` = true WHERE cart.user_id =:idUser and cart.create_order = :createOrder", nativeQuery = true)
    void confirmOrder ( Long idUser, Timestamp createOrder);
}
