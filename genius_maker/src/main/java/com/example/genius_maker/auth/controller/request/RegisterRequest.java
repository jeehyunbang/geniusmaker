package com.example.genius_maker.auth.controller.request;

public record RegisterRequest(
    String email,
    String password,
    String memberType
) {
}
