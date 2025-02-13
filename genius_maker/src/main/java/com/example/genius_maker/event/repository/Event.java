package com.example.genius_maker.event.repository;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "event")
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "image_url", length = 500, nullable = false)
    private String imageUrl;

    @Column(name = "organizer", length = 100, nullable = false)
    private String organizer;

    @Column(name = "type", length = 100, nullable = false)
    private String type;

    @Column(name = "region", length = 100, nullable = false)
    private String region;

    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name = "end_at", nullable = false)
    private LocalDateTime endAt;

    @Column(name = "fee", nullable = true)
    private int fee;

    @Column(name = "official_url", length = 500, nullable = false)
    private String officialUrl;

    @Column(name = "join_url", length = 500, nullable = false)
    private String joinUrl;

    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    @Column(name = "offline", nullable = false)
    private boolean offline;

    public Event(
        final String name,
        final String imageUrl,
        final String organizer,
        final String type,
        final String region,
        final LocalDateTime startAt,
        final LocalDateTime endAt,
        final int fee,
        final String officialUrl,
        final String joinUrl,
        final String description,
        final boolean offline
    ) {
        this(
            null,
            name,
            imageUrl,
            organizer,
            type,
            region,
            startAt,
            endAt,
            fee,
            officialUrl,
            joinUrl,
            description,
            offline
        );
    }

    public Event(
        final Long id,
        final String name,
        final String imageUrl,
        final String organizer,
        final String type,
        final String region,
        final LocalDateTime startAt,
        final LocalDateTime endAt,
        final int fee,
        final String officialUrl,
        final String joinUrl,
        final String description,
        final boolean offline
    ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.organizer = organizer;
        this.type = type;
        this.region = region;
        this.startAt = startAt;
        this.endAt = endAt;
        this.fee = fee;
        this.officialUrl = officialUrl;
        this.joinUrl = joinUrl;
        this.description = description;
        this.offline = offline;
    }
}
