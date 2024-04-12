package com.example.sprint2.config;

import com.example.sprint2.model.Role;
import com.example.sprint2.model.User;
import com.example.sprint2.repository.IUserRepository;
import com.example.sprint2.service.IUserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.InvalidParameterException;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenUtil {
    @Autowired
    private IUserRepository userService;
    public String generateToken(User user){
        long expirationTime = System.currentTimeMillis() + 86400000L * 10L;
        Map<String,Object> claims = new HashMap<>();
        String se = "73608685541105edccb3ea757e3e6487d30f71977c74db789b5df252d85d598b";
        byte[] bytes = Decoders.BASE64.decode(se);
        claims.put("nameAccount",user.getAccount());
        String role = userService.getRoleForUser(user.getAccount());
        try {
            String token = Jwts.builder()
                    .setClaims(claims)
                    .claim("ROLE",role)
                    .setSubject(user.getAccount())
                    .setExpiration(new Date(expirationTime))
                    .signWith(Keys.hmacShaKeyFor(bytes), SignatureAlgorithm.HS256)
                    .compact();
            return token;
        } catch (Exception e){
            throw new InvalidParameterException("khong the tao ra  jwt token bi loi r: " + e.getMessage());
        }
    }

    public Key getSignKey() {
        String se = "73608685541105edccb3ea757e3e6487d30f71977c74db789b5df252d85d598b";
        byte[] bytes = Decoders.BASE64.decode(se);

        return Keys.hmacShaKeyFor(bytes);
    }
    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public  <T> T extractClaim(String token, Function<Claims,T> claimsTResolver){
        final Claims claims =  this.extractAllClaims(token);
        return claimsTResolver.apply(claims);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);

    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


}
