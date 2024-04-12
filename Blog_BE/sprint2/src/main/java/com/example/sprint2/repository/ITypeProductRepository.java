package com.example.sprint2.repository;

import com.example.sprint2.model.TypeProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITypeProductRepository extends JpaRepository<TypeProduct,Long> {
    @Query(value = "select * from type_product td where td.is_deleted = false ",nativeQuery = true)
    List<TypeProduct> getAllByTypeProduct();
}
