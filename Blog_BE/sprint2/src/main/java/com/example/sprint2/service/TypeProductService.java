package com.example.sprint2.service;

import com.example.sprint2.model.TypeProduct;
import com.example.sprint2.repository.ITypeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeProductService implements ITypeProductService {
    @Autowired
    private ITypeProductRepository typeProductRepository;
    @Override
    public List<TypeProduct> getAllByTypeProduct() {
        return typeProductRepository.getAllByTypeProduct();
    }
}
