package com.example.sprint2.service;

import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.dto.NewIProductDto;
import com.example.sprint2.dto.ProductDto;
import com.example.sprint2.model.Product;
import com.example.sprint2.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Page<Product> listProduct(Pageable pageable, Long idType) {
        return productRepository.listProduct(pageable, idType);
    }

    @Override
    public Page<Product> listAllProduct(Pageable pageable) {
        return productRepository.listAllProduct(pageable);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.getProductById(id);
    }

    @Override
    public List<Product> listRelated() {
        return productRepository.listRelated();
    }

    @Override
    public Page<Product> manageProduct(Pageable pageable, String name) {
        return productRepository.manageProduct(pageable, "%" + name + "%");
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void createProduct(ProductDto product) {
        productRepository.createProduct(product);
    }

    @Override
    public Optional<NewIProductDto> getIdForProduct(Long idProduct) {
        return productRepository.getIdForProduct(idProduct);
    }

    @Override
    public void updateProduct(ProductDto product) {
        productRepository.updateProduct(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteProduct(id);
    }

    @Override
    public List<IProductDto> getDetailsOrder(Long idUser, Timestamp createOrder) {
        return productRepository.getDetailsOrder(idUser,createOrder);
    }

    @Override
    public List<IProductDto> getListProductForPayment(Long idUser, String createOrder) {
        return productRepository.getListProductForPayment(idUser,createOrder);
    }

    @Override
    public List<IProductDto> checkListProductInStock(Long idUser) {
        return productRepository.checkListProductInStock(idUser);
    }

}
