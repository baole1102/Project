package com.example.sprint2.controller;

import com.example.sprint2.dto.*;
import com.example.sprint2.model.User;
import com.example.sprint2.service.IBlogService;
import com.example.sprint2.service.ICartService;
import com.example.sprint2.service.IProductService;
import com.example.sprint2.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private IBlogService blogService;
    @Autowired
    private IProductService productService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ICartService cartService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto userDto,
                                      BindingResult bindingResult) {
        Map<String, String> listError = new HashMap<>();
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            if (userService.findUserByEmail(userDto.getEmail()) != null) {
                listError.put("email", "Email đã tồn tại");
            }
            if (userService.findByAccount(userDto.getAccount()).isPresent()) {
                listError.put("account", "Account đã tồn tại");
            }
            if (userService.findUserByNumber(userDto.getNumber()) != null) {
                listError.put("number", "Số điện thoại đã tồn tại");
            }
            String encode = passwordEncoder.encode(userDto.getPassword());
            User user = new User();
            BeanUtils.copyProperties(userDto, user);
            user.setPassword(encode);
            user.setImage("https://scontent.fdad1-2.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_eui2=AeGnqHaTZnBUjSEcY1-FBvApik--Qfnh2B6KT75B-eHYHk-NP5Nes0Pnh533_NuJyZObt2QYtQlJmnvnxUfFEIi5&_nc_ohc=sjxi-v0F2pYAX9hlWn4&_nc_ht=scontent.fdad1-2.fna&edm=AP4hL3IEAAAA&oh=00_AfDCVvaXvpBk5plCuuZwlUiyRH8a3tpqidZMft5DkfM1SQ&oe=660E7019");
            userService.registerUser(user, 2L);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findByIdUser(@PathVariable("id") Long idUser) {
        User user = userService.findUserById(idUser);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/blog")
    public ResponseEntity<?> getBlogByIdUser(@RequestParam(name = "idUser") Long idUser,
                                             @RequestParam(name = "page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 4);
        Page<IBlogDto> list = blogService.getBlogByIdUser(pageable, idUser);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody UserDto userDto) {
        ApiResponse<User> response = new ApiResponse();
        try {
            String token = userService.login(userDto.getAccount(), userDto.getPassword());
            Optional<User> user = userService.findByAccount(userDto.getAccount());
            String role = userService.getRoleForUser(userDto.getAccount());
            response.setDataRes(user.get());
            response.setToken(token);
            response.setRole(role);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/historyProduct")
    public ResponseEntity<?> getListHistoryProduct(@RequestParam(name = "page") int page,
                                                   @RequestParam Long idUser) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<ICartDto> list = cartService.historyProduct(pageable, idUser);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @GetMapping("/detailsOrder")
    public ResponseEntity<?> getDetailsOrder(@RequestParam Long idUser,
                                             @RequestParam(defaultValue = "") String orderDate  ) {
        Timestamp timestamp = convertToTimestamp(orderDate);
        List<IProductDto> list = productService.getDetailsOrder(idUser, timestamp);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
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

    @GetMapping("/totalOrder")
    public ResponseEntity<?> getTotalOrder(@RequestParam Long idUser,
                                             @RequestParam(defaultValue = "") String orderDate  ) {
        Timestamp timestamp = convertToTimestamp(orderDate);
        Long total = userService.totalOrder(idUser,timestamp);
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @PostMapping("/checkPassword")
    public ResponseEntity<?> checkPassword(@RequestBody UserDto userDto){
        User user = userService.findUserById(userDto.getId());
        boolean check = passwordEncoder.matches(userDto.getPassword(),user.getPassword());
        return new ResponseEntity<>(check,HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public void changePassword(@RequestBody UserDto userDto){
        User user = userService.findUserById(userDto.getId());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userService.save(user);
    }
}
