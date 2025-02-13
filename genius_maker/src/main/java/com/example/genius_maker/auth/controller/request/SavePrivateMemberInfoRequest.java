package com.example.genius_maker.auth.controller.request;

public record SavePrivateMemberInfoRequest(
    String email,
    String password,
    String name,
    String team,
    String interestResearch
) {
}
