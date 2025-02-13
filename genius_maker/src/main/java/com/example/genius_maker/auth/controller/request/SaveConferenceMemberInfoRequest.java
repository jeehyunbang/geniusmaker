package com.example.genius_maker.auth.controller.request;

import java.time.LocalDateTime;

public record SaveConferenceMemberInfoRequest(
    String name,
    LocalDateTime foundedAt,
    String manager,
    String email,
    String password,
    String researchType,
    String conferenceAddress,
    String imageUrl,
    boolean discussionSubmit,
    int joinFee,
    String description,
    String officialUrl,
    String socialMediaUrl
) {
}
