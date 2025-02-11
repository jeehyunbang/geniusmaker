package com.example.genius_maker.auth.controller.request;

public record LoginRequest(
    String email,
    String password
) {
}
