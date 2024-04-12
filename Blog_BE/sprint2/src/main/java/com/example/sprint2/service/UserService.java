package com.example.sprint2.service;

import com.example.sprint2.config.JwtTokenUtil;
import com.example.sprint2.dto.IProductDto;
import com.example.sprint2.dto.IUserDto;
import com.example.sprint2.model.Product;
import com.example.sprint2.model.User;
import com.example.sprint2.repository.IUserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import org.thymeleaf.context.Context;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    @Autowired
    private final JwtTokenUtil jwtTokenUtil;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User findUserByNumber(String number) {
        return userRepository.findUserByNumber(number);
    }

    @Override
    public void registerUser(User user, Long role) {
        userRepository.registerUser(user, role);
    }

    @Override
    public User findUserById(Long idUser) {
        return userRepository.findUserById(idUser);
    }

    @Override
    public String login(String nameAccount, String passWord) throws Exception {
        Optional<User> optionalUser = userRepository.findByAccount(nameAccount);
        if (optionalUser.isEmpty()) {
            throw new DataFormatException("Sai tai khoan hoac mat khau ");
        }
        User user = optionalUser.get();
        if (!passwordEncoder.matches(passWord, user.getPassword())) {
            throw new BadCredentialsException("sai toan khoan hoac mat khau");
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                nameAccount, passWord
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(optionalUser.get());
    }

    @Override
    public Optional<User> findByAccount(String account) {
        return userRepository.findByAccount(account);
    }


    @Override
    public void updateForUser(Long id) {
        userRepository.updateForUser(id);
    }

    @Override
    public User findUserByAccount(String account) {
        return userRepository.findUserByAccount(account);
    }

    @Override
    public String getRoleForUser(String account) {
        return userRepository.getRoleForUser(account);
    }

    @Override
    public Page<IUserDto> getAllUserByAmin(Pageable pageable, String name) {
        return userRepository.getAllUserByAmin(pageable, "%" + name + "%");
    }

    @Override
    public void deleteAccount(Long id) {
        userRepository.deleteAccount(id);
    }

    @Override
    public Long totalOrder(Long idUser, Timestamp createOrder) {
        return userRepository.totalOrder(idUser, createOrder);
    }


    @Override
    public void sendMailBooking(User user, List<IProductDto> list, Long total) {
        String to = user.getEmail();
        String subject = "Thông báo về đơn hàng của bạn";
        String templateName = "mail";
        Context context = new Context();
        context.setVariable("user", user);
        context.setVariable("product", list);
        context.setVariable("total", total);
        sendEmailWithHtmlTemplate(to, subject, templateName, context);
    }

    @Override
    public Long total(Long idUser, String createOrder) {
        return userRepository.total(idUser, createOrder);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
