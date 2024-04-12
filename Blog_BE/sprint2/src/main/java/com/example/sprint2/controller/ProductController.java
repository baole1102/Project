package com.example.sprint2.controller;

import com.example.sprint2.dto.IBlogDto;
import com.example.sprint2.dto.NewIProductDto;
import com.example.sprint2.dto.ProductDto;
import com.example.sprint2.model.Product;
import com.example.sprint2.model.TypeProduct;
import com.example.sprint2.service.IBlogService;
import com.example.sprint2.service.IProductService;
import com.example.sprint2.service.ITypeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    private IBlogService blogService;
    @Autowired
    private ITypeProductService typeProductService;

    @GetMapping
    public ResponseEntity<?> getListProduct(@RequestParam(name = "page",defaultValue = "0") int page,
                                            @RequestParam(name = "idType",defaultValue = "0") Long idType){
        Pageable pageable = PageRequest.of(page,8);
        if (idType == 0){
            Page<Product> list = productService.listAllProduct(pageable);
            return new ResponseEntity<>(list,HttpStatus.OK);
        }else {
            Page<Product> list = productService.listProduct(pageable,idType);
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
    }

    @GetMapping("/detailProduct/{id}")
    public ResponseEntity<?> findProductById(@PathVariable Long id){
        Product product = productService.getProductById(id);
        if (product == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
    @GetMapping("/related")
    public ResponseEntity<?> listRelated(){
        List<Product> list = productService.listRelated();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    @GetMapping("/forProduct")
    public ResponseEntity<?> getListProduct(){
        List<IBlogDto> list = blogService.listBlogForProduct();
        if (list == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/typeProduct")
    public ResponseEntity<?> getListTypeProduct(){
        List<TypeProduct> list = typeProductService.getAllByTypeProduct();
        if (list == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findProductByOptional(@PathVariable Long id){
        Optional<NewIProductDto> product = productService.getIdForProduct(id);
        if (product == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }


}
