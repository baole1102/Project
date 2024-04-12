package com.example.sprint2.controller;

import com.example.sprint2.dto.ICartDto;
import com.example.sprint2.dto.ProductDto;
import com.example.sprint2.model.Cart;
import com.example.sprint2.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
    @RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private ICartService cartService;

    @PostMapping
    public void addToCart(@RequestBody ProductDto productDto){
        List<Cart> list = cartService.findByProduct(productDto.getIdProduct(),productDto.getIdUser());
        if (list.size() == 0 ){
            cartService.addToCart(productDto.getIdProduct(),productDto.getIdUser());
        }else {
            Cart cart = cartService.getCartByIdProductAndIdUser(productDto.getIdProduct(),productDto.getIdUser());
            cart.setQuantity(cart.getQuantity() + 1);
            cartService.save(cart);
        }
    }

    @GetMapping("/{idUser}")
    public ResponseEntity<?> listProductInCart(@PathVariable Long idUser){
        List<ICartDto> listCart = cartService.listCart(idUser);
        return new ResponseEntity<>(listCart, HttpStatus.OK);
    }

    @PostMapping("/minus")
    public void minusProduct(@RequestBody ProductDto productDto){
        Cart cart = cartService.getCartByIdProductAndIdUser(productDto.getIdProduct(),productDto.getIdUser());
        cart.setQuantity(cart.getQuantity() - 1);
        cartService.save(cart);
    }

    @PostMapping("/add")
    public void addProduct(@RequestBody ProductDto productDto){
        Cart cart = cartService.getCartByIdProductAndIdUser(productDto.getIdProduct(),productDto.getIdUser());
        cart.setQuantity(cart.getQuantity() + 1);
        cartService.save(cart);
    }

    @GetMapping("/totalPrice/{idUser}")
    public ResponseEntity<?> getTotalPrice(@PathVariable Long idUser){
        Long total = cartService.totalPrice(idUser);
        return new ResponseEntity<>(total,HttpStatus.OK);
    }

    @GetMapping("/count/{idUser}")
    public ResponseEntity<?> getCountCart(@PathVariable Long idUser){
        Long count = cartService.countCart(idUser);
        return new ResponseEntity<>(count,HttpStatus.OK);
    }


    @DeleteMapping("/deleteCart")
    public void deleteCartProduct(@RequestParam Long idProduct,@RequestParam Long idUser){
        cartService.deleteCart(idProduct,idUser);
    }
}
