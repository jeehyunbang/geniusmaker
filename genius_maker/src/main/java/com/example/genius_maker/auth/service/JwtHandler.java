package com.example.genius_maker.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtHandler {

    public static final String PREFIX = "Bearer ";

    @Value("${secret.jwt.secret-key}")
    private String secret;
    @Value("${secret.jwt.expire-time}")
    private Long expireTime;

    public String generateToken(final Long memberId) {
        return Jwts.builder()
            .claim("member_id", memberId)
            .expiration(parseCurrnetDate())
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }

    private Date parseCurrnetDate() {
        final long now = new Date().getTime();
        return new Date(now + expireTime);
    }

    public void validateToken(final String bearerToken) {
        final String token = extract(bearerToken);
        try {
            Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parse(token);
            log.info("토큰 검증 성공!");
        } catch (Exception e) {
            log.info("토큰 검증 실패...");
            throw e;
        }
    }

    private String extract(final String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith(PREFIX)) {
            return bearerToken.substring(PREFIX.length());
        }

        return bearerToken;
    }

    public Long getMemberId(final String bearerToken) {
        String token = extract(bearerToken);
        final Claims claims = parseClaims(token);
        return claims.get("member_id", Long.class);
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}
