package com.example.genius_maker.event.controller.response;

public record SearchEventsResponse(
    Long id,
    String name,
    String imageUrl,
    String region,
    String eventType,
    boolean offline
) {
}
