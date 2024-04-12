package com.example.sprint2.config;
import com.example.sprint2.model.UserHasRole;
import com.example.sprint2.repository.IUserHasRoleRepository;
import com.example.sprint2.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private final IUserRepository userRepository;


    @Autowired
    private IUserHasRoleRepository userHasRoleRepository;
    //user detail object
    @Bean
    public UserDetailsService userDetailsService(){
        return nameAccount -> {
//            Optional<User> optionalUser = userRepository.findByAccount(nameAccount);
            com.example.sprint2.model.User user = this.userRepository.findUserByAccount(nameAccount);
            List<UserHasRole> userHasRoles = this.userHasRoleRepository.findAllByUser(user);

            List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
            if (userHasRoles != null) {
                for (UserHasRole userRole : userHasRoles) {
                    // ROLE_USER, ROLE_ADMIN,..
                    GrantedAuthority authority = new SimpleGrantedAuthority(userRole.getRole().getName());
                    grantList.add(authority);
                }
            }

            return new User(user.getAccount(), user.getPassword(), grantList);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

}
