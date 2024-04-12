package com.example.sprint2.service;

import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.dto.NewIProductDto;
import com.example.sprint2.dto.ProductDto;
import com.example.sprint2.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface IProductService {
    Page<Product> listProduct(Pageable pageable , Long idType);
    Page<Product> listAllProduct(Pageable pageable);

    Product getProductById(Long id);
    List<Product> listRelated();
    Page<Product> manageProduct(Pageable pageable, String name);
    void save(Product product);
    void createProduct(ProductDto product);
    Optional<NewIProductDto> getIdForProduct(Long idProduct);
    void updateProduct(@Param("product") ProductDto product);
    void deleteProduct(@Param("id") Long id);

    List<IProductDto> getDetailsOrder(Long idUser, Timestamp createOrder);
    List<IProductDto> getListProductForPayment(Long idUser, String createOrder);
    List<IProductDto> checkListProductInStock(@Param("idUser") Long idUser);

}
