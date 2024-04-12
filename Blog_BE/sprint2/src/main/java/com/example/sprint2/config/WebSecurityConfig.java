package com.example.sprint2.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests
                            .requestMatchers(("/api/user/register"),
                                    ("/api/user/login"))
                            .permitAll()
                            .requestMatchers(("/api/blog/**")).permitAll()
                            .requestMatchers(("/api/cart/**")).hasAnyRole("USER","ADMIN","MEMBER")
                            .requestMatchers(("/api/category")).permitAll()
                            .requestMatchers(("/api/favorite/**")).hasAnyRole("USER","ADMIN","MEMBER")
                            .requestMatchers(("/api/payment/createPay")).hasRole("USER")
                            .requestMatchers(("/infor_payment/**")).hasRole("USER")
                            .requestMatchers(("/api/paymentCart")).hasAnyRole("USER", "ADMIN","MEMBER")
                            .requestMatchers(("/infor_paymentCart/**")).hasAnyRole("USER", "ADMIN","MEMBER")
//                            .requestMatchers(("/api/admin/**")).hasRole("ADMIN")
                            .requestMatchers(("/api/product/**")).permitAll()
                            .requestMatchers(("/api/topic/**")).permitAll()
                            .requestMatchers(("/api/user/**")).hasAnyRole("USER","MEMBER","ADMIN")
                            .requestMatchers(("/api/member/**")).hasRole("MEMBER")
                            .anyRequest().permitAll()
                    ;
                })
        ;
        return http.build();
    }

}
