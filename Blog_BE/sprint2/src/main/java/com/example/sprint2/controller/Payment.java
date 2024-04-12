package com.example.sprint2.controller;

import com.example.sprint2.config.ConfigVNP;
import com.example.sprint2.dto.ICartDto;
import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.model.Product;
import com.example.sprint2.model.User;
import com.example.sprint2.service.ICartService;
import com.example.sprint2.service.IProductService;
import com.example.sprint2.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin("*")
public class Payment {
    @Autowired
    private IUserService userService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private IProductService productService;

    @GetMapping("/api/payment/createPay")
    private ResponseEntity<String> payment(@RequestParam Long price,
                                           @RequestParam Long idAccount
    ) throws UnsupportedEncodingException {
        long amount = price * 100;
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        String bankCode = "NCB";
        String vnp_TxnRef = ConfigVNP.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = ConfigVNP.vnp_TmnCode;
        String vnp_ReturnUrl = "http://localhost:3000/payment/" + idAccount;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNP.hmacSHA512(ConfigVNP.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNP.vnp_PayUrl + "?" + queryUrl;
        return new ResponseEntity<>(paymentUrl, HttpStatus.OK);
    }

    @GetMapping("/infor_payment/{idAccount}")
    public void transaction(
            @PathVariable Long idAccount,
            @RequestParam(value = "vnp_Amount", required = false) String amount,
            @RequestParam(value = "vnp_BankCode", required = false) String bankCode,
            @RequestParam(value = "vnp_OrderInfo", required = false) String order,
            @RequestParam(value = "vnp_ResponseCode", required = false) String responseCode) {
        // Xử lý thông tin thanh toán ở đây
        System.out.println(idAccount);
        User user = userService.findUserById(idAccount);
        System.out.println(user.toString());
        user.setStatus(true);
        userService.updateForUser(idAccount);
    }

    @GetMapping("/api/paymentCart")
    private ResponseEntity<?> paymentCart(@RequestParam Long totalPrice,
                                               @RequestParam Long idAccount
    ) throws UnsupportedEncodingException {
        long amount = totalPrice * 100;
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        String bankCode = "NCB";
        String vnp_TxnRef = ConfigVNP.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = ConfigVNP.vnp_TmnCode;
        String vnp_ReturnUrl = "http://localhost:3000/paymentCart/" + idAccount;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNP.hmacSHA512(ConfigVNP.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNP.vnp_PayUrl + "?" + queryUrl;
//        List<IProductDto> list = productService.checkListProductInStock(idAccount);
//        System.out.println(list);
//        for (IProductDto product : list){
//            System.out.println(product.getQuantity());
//            System.out.println(product.getProductQuantity());
//            if(product.getProductQuantity() < product.getQuantity()){
//                System.out.println("A");
//             return new ResponseEntity<>(false,HttpStatus.OK);
//            }
//        }
        return new ResponseEntity<>(paymentUrl, HttpStatus.OK);
    }

    @GetMapping("/infor_paymentCart/{idAccount}")
    public ResponseEntity<?> transactionCart(
            @PathVariable Long idAccount,
            @RequestParam(value = "status") String status ,
            @RequestParam(value = "vnp_Amount", required = false) String amount,
            @RequestParam(value = "vnp_BankCode", required = false) String bankCode,
            @RequestParam(value = "vnp_OrderInfo", required = false) String order,
            @RequestParam(value = "vnp_ResponseCode", required = false) String responseCode) {
        // Xử lý thông tin thanh toán ở đây
        if (status.equals("00")){
            User user = userService.findUserById(idAccount);
            LocalDateTime date = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = date.format(formatter);
            cartService.paymentCart(idAccount,formattedDateTime);
            Long total = userService.total(idAccount,formattedDateTime);
            List<IProductDto> list = productService.getListProductForPayment(idAccount,formattedDateTime);
            for (IProductDto product : list){
                Product product1 = productService.getProductById(product.getId());
                product1.setQuantity(product1.getQuantity() - product.getQuantity());
                productService.save(product1);
            }
            userService.sendMailBooking(user,list,total);
            return new ResponseEntity<>("YES",HttpStatus.OK);
        }else {
            return new ResponseEntity<>("NO", HttpStatus.OK);
        }
    }
}
