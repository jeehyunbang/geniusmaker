package com.example.genius_maker.event.controller.response;

import com.example.genius_maker.event.repository.Event;

import java.time.LocalDateTime;

public record FindByEventById(
    Long id,
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
    public static FindByEventById of(final Event event) {
        return new FindByEventById(
            event.getId(),
            event.getName(),
            event.getImageUrl(),
            event.getOrganizer(),
            event.getType(),
            event.getRegion(),
            event.getStartAt(),
            event.getEndAt(),
            event.getFee(),
            event.getOfficialUrl(),
            event.getJoinUrl(),
            event.getDescription(),
            event.isOffline()
        );
    }
}
