package com.example.sprint2.config;


import com.example.sprint2.service.JwtUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailService jwtUserDetailService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
            if (isByPassToken(request)) {
                filterChain.doFilter(request, response); // enable bypass
                return;
            }
            // need token
            final String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "UNAUTHORIZED");
                return;
            }
            final String token = authHeader.substring(7);
            final String nameAccount = jwtTokenUtil.extractUserName(token);
            if (nameAccount != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {
//                User userDetails = (User) userDetailsService.loadUserByUsername(nameAccount);
                UserDetails userDetails = this.jwtUserDetailService.loadUserByUsername(nameAccount);
                if (jwtTokenUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails,
                                    null,
                                    userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "UNAUTHORIZED");
        }


    }

    private boolean isByPassToken(@NonNull HttpServletRequest request) {
        final List<Pair<String, String>> byPassTokens = Arrays.asList(
                Pair.of("/api/user/login", "POST"),
                Pair.of("/api/user/register", "POST"),
                Pair.of("/api/product", "GET"),
                Pair.of("/api/blog", "GET"),
                Pair.of("/api/category", "GET"),
                Pair.of("/api/topic", "GET"),
                Pair.of("/api/product/typeProduct", "GET")
//                Pair.of("/api/getListHot", "GET"),
//                Pair.of("api/getAll", "GET"),
//                Pair.of("api/find", "GET"),
//                Pair.of("account/checkUserName", "GET"),
//                Pair.of("account/checkPhoneNumber", "GET"),
//                Pair.of("account/checkEmail", "GET")
        );
        for (Pair<String, String> byPassToken : byPassTokens) {
            if (request.getServletPath().contains(byPassToken.getFirst()) &&
                    request.getMethod().equals(byPassToken.getSecond())) {
                return true;
            }
        }
        return false;
    }

}
