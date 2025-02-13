package com.example.genius_maker.event.controller.request;

import java.time.LocalDateTime;

public record SaveEventRequest(
    String name,
    String imageUrl,
    String organizer,
    String eventType,
    String region,
    LocalDateTime eventStartAt,
    LocalDateTime eventEndAt,
    int fee,
    String officialUrl,
    String joinUrl,
    String description,
    boolean offline
) {
}
