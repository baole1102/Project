package com.example.sprint2.controller;

import com.example.sprint2.dto.*;
import com.example.sprint2.model.Product;
import com.example.sprint2.model.User;
import com.example.sprint2.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private IBlogService blogService;
    @Autowired
    private ProductService productService;
    @Autowired
    private IUserService userService;
    @Autowired
    private ICartService cartService;

    @PatchMapping("/editBlog")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MEMBER')")
    public ResponseEntity<?> editBlogByAdmin(@RequestBody @Valid BlogDTO blogDTO, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        blogService.editBlog(blogDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MEMBER')")
    public ResponseEntity<?> deleteBlogByAdmin(@PathVariable Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        blogService.deleteBlog(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/manageBlog")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MEMBER')")
    public ResponseEntity<?> manageBlog(@RequestParam(name = "id", defaultValue = "0") Long id,
                                        @RequestParam(name = "page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        if (id == 0) {
            Page<IBlogDto> list = blogService.pageListBlog(pageable);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            Page<IBlogDto> list = blogService.manageBlog(pageable, id);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
    }

    @PostMapping("/addBlog")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MEMBER')")
    public ResponseEntity<?> save(@RequestBody @Valid BlogDTO blogDTO, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        blogService.create(blogDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllBlogBySearch(@RequestParam(name = "id", defaultValue = "0") Long id,
                                                @RequestParam(name = "page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        if (id == 0) {
            Page<IBlogDto> list = blogService.pageListBlog(pageable);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        Page<IBlogDto> list = blogService.getAllBlogSearch(pageable, id);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/manageProduct")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> manageProduct(@RequestParam(name = "name", defaultValue = "") String name,
                                           @RequestParam(name = "page", defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        Page<Product> list = productService.manageProduct(pageable,name.trim());
        if (list == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addProduct(@RequestBody @Valid ProductDto product,BindingResult bindingResult){
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        productService.createProduct(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/editProduct")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> editProductByAdmin(@RequestBody @Valid ProductDto productDto, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        productService.updateProduct(productDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteProduct/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProductByAdmin(@PathVariable Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getAllAccount")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllAccountByAdmin(@RequestParam(name = "name", defaultValue = "") String name,
                                                  @RequestParam(name = "page",defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        Page<IUserDto> list = userService.getAllUserByAmin(pageable,name);
        if (list == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAccountByAdmin(@PathVariable Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/listOrder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllListOrder(@RequestParam(name = "page", defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        Page<ICartDto> list = cartService.listOrderForAdmin(pageable);
        if (list == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PostMapping("/confirmOrder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void confirmOrder(@RequestBody CartDto cartDto ){
        Timestamp timestamp = convertToTimestamp(cartDto.getCreateOrder());
        cartService.confirmOrder(cartDto.getIdUser(),timestamp);
    }

    private Timestamp convertToTimestamp(String orderDateTime) {
        if (orderDateTime.isEmpty()) {
            return null;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date parsedDate = dateFormat.parse(orderDateTime);
            return new Timestamp(parsedDate.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/detailsOrder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDetailsOrder(@RequestParam Long idUser,
                                             @RequestParam(defaultValue = "") String orderDate  ) {
        Timestamp timestamp = convertToTimestamp(orderDate);
        List<IProductDto> list = productService.getDetailsOrder(idUser, timestamp);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/totalOrder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getTotalOrder(@RequestParam Long idUser,
                                           @RequestParam(defaultValue = "") String orderDate  ) {
        Timestamp timestamp = convertToTimestamp(orderDate);
        Long total = userService.totalOrder(idUser,timestamp);
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> findByIdUser(@PathVariable("id") Long idUser) {
        User user = userService.findUserById(idUser);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
