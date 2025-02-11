package com.example.genius_maker.auth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class PasswordEncoder {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String encrypt(final String password) {
        return encoder.encode(password);
    }

    public boolean match(final String password, final String encodedPassword) {
        return encoder.matches(password, encodedPassword);
    }
}
