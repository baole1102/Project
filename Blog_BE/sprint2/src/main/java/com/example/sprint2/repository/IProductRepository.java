package com.example.sprint2.repository;

import com.example.sprint2.dto.BlogDTO;
import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.dto.NewIProductDto;
import com.example.sprint2.dto.ProductDto;
import com.example.sprint2.model.Product;
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
import java.util.Optional;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select * from product p where p.is_deleted = false and p.type_product_id = :idType ", nativeQuery = true)
    Page<Product> listProduct(Pageable pageable, Long idType);

    @Query(value = "select * from product p where p.is_deleted = false", nativeQuery = true)
    Page<Product> listAllProduct(Pageable pageable);

    Product getProductById(Long id);

    @Query(value = "select * from product p\n" +
            "where p.is_deleted = false\n" +
            "order by p.content desc\n" +
            "limit 4", nativeQuery = true)
    List<Product> listRelated();

    @Query(value = "select * from product p where p.is_deleted = false and p.name_product like :name", nativeQuery = true)
    Page<Product> manageProduct(Pageable pageable, String name);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO product (content, description, image_product, name_product, price, quantity, type_product_id) " +
            "VALUES (:#{#product.content}, :#{#product.description}, :#{#product.imageProduct}, :#{#product.nameProduct}, " +
            ":#{#product.price}, :#{#product.quantity}, :#{#product.typeProductId})", nativeQuery = true)
    void createProduct(@Param("product") ProductDto product);

    @Query(value = "select p.content as content, \n" +
            "p.description as description,\n" +
            "p.image_product as imageProduct,\n" +
            "p.name_product as nameProduct,\n" +
            "p.price as price,\n" +
            "p.quantity as quantity,\n" +
            "p.id as id,\n" +
            "p.type_product_id as typeProductId\n" +
            "from product p\n" +
            "join type_product tp on p.type_product_id = tp.id\n" +
            "where p.id = :idProduct and p.is_deleted = false", nativeQuery = true)
    Optional<NewIProductDto> getIdForProduct(@Param("idProduct") Long idProduct);

    @Transactional
    @Modifying
    @Query(value = "UPDATE product SET type_product_id = :#{#product.typeProductId}" +
            ",image_product= :#{#product.imageProduct}" +
            ",description = :#{#product.description} , " +
            "content = :#{#product.content} ,name_product = :#{#product.nameProduct}," +
            "price = :#{#product.price}, " +
            "quantity = :#{#product.quantity} WHERE id = :#{#product.idProduct}", nativeQuery = true)
    void updateProduct(@Param("product") ProductDto product);

    @Transactional
    @Modifying
    @Query(value = "update product set product.is_deleted = 1 where product.id = :id", nativeQuery = true)
    void deleteProduct(@Param("id") Long id);

    @Query(value = "SELECT p.id AS id, p.content AS content, " +
            "p.description AS description, p.image_product AS imageProduct, " +
            "p.name_product AS nameProduct, p.price AS price, " +
            "c.quantity AS quantity, c.confirm AS confirm " +
            "FROM product p " +
            "JOIN cart c ON c.product_id = p.id " +
            "WHERE c.user_id = :idUser AND c.create_order = :createOrder ", nativeQuery = true)
    List<IProductDto> getDetailsOrder(@Param("idUser") Long idUser, @Param("createOrder") Timestamp createOrder);

    @Query(value = "SELECT p.id AS id, p.content AS content, " +
            "p.description AS description, p.image_product AS imageProduct, " +
            "p.name_product AS nameProduct, p.price AS price, " +
            "c.quantity AS quantity, c.confirm AS confirm " +
            "FROM product p " +
            "join cart c on c.product_id = p.id\n" +
            "where c.user_id = :idUser and c.create_order = :createOrder ", nativeQuery = true)
    List<IProductDto> getListProductForPayment(@Param("idUser") Long idUser, @Param("createOrder") String createOrder);

    @Query(value = "SELECT p.id AS id, p.content AS content, \n" +
            "       p.description AS description, p.image_product AS imageProduct, \n" +
            "       p.name_product AS nameProduct, p.price AS price,\n" +
            "       c.quantity AS quantity, c.confirm AS confirm, p.quantity AS productQuantity\n" +
            "FROM product p \n" +
            "JOIN cart c ON c.product_id = p.id\n" +
            "WHERE c.user_id = :idUser and c.status = false ", nativeQuery = true)
    List<IProductDto> checkListProductInStock(@Param("idUser") Long idUser);

}
