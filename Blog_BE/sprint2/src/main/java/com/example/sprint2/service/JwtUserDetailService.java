package com.example.sprint2.service;

import com.example.sprint2.model.UserHasRole;
import com.example.sprint2.repository.IUserHasRoleRepository;
import com.example.sprint2.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailService implements UserDetailsService {
    @Autowired
    private  IUserRepository userRepository;


    @Autowired
    private IUserHasRoleRepository userHasRoleRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.sprint2.model.User user = this.userRepository.findUserByAccount(username);
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
    }
}
