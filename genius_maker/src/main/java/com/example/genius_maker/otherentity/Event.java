package com.example.genius_maker.otherentity;

import com.example.genius_maker.auth.entity.Member;
import com.example.genius_maker.common.audit.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "event")
@Entity
public class Event extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "thumbnail_url", length = 100, nullable = false)
    private String thumbnailUrl;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "region", length = 100, nullable = false)
    private String region;

    @Column(name = "category", length = 20, nullable = false)
    private String category;

    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    @Column(name = "organizer", length = 100, nullable = false)
    private String organizer;

    @Column(name = "fee", nullable = false)
    private int fee;

    @Column(name = "join_path", length = 100, nullable = false)
    private String joinPath;

    @Column(name = "join_requirement", length = 100, nullable = false)
    private String joinRequirement;

    @Column(name = "contact", length = 100, nullable = false)
    private String contact;

    @Column(name = "apply_start_at", nullable = false)
    private LocalDateTime applyStartAt;

    @Column(name = "apply_end_at", nullable = false)
    private LocalDateTime applyEndAt;

    @Column(name = "event_start_at", nullable = false)
    private LocalDateTime eventStartAt;

    @Column(name = "event_end_at", nullable = false)
    private LocalDateTime eventEndAt;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
