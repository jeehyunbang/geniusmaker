package com.example.genius_maker.auth.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "conference_member_info")
@Entity
public class ConferenceMemberInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "founded_at", nullable = false)
    private LocalDateTime foundedAt;

    @Column(name = "manager", length = 100, nullable = false)
    private String manager;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "password", length = 1000, nullable = false)
    private String password;

    @Column(name = "research_type", length = 100, nullable = false)
    private String researchType;

    @Column(name = "image_url", length = 1000, nullable = false)
    private String imageUrl;

    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @Column(name = "discussion_submit", nullable = false)
    private boolean discussionSubmit;

    @Column(name = "join_fee", nullable = true)
    private int joinFee;

    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    @Column(name = "official_url", length = 500, nullable = false)
    private String officialUrl;

    @Column(name = "social_media_url", length = 500, nullable = false)
    private String socialMediaUrl;

    public ConferenceMemberInfo(
        final String name,
        final LocalDateTime foundedAt,
        final String manager,
        final String email,
        final String password,
        final String researchType,
        final String imageUrl,
        final String address,
        final boolean discussionSubmit,
        final int joinFee,
        final String description,
        final String officialUrl,
        final String socialMediaUrl
    ) {
        this(
            null,
            name,
            foundedAt,
            manager,
            email,
            password,
            researchType,
            imageUrl,
            address,
            discussionSubmit,
            joinFee,
            description,
            officialUrl,
            socialMediaUrl
        );
    }

    public ConferenceMemberInfo(
        final Long id,
        final String name,
        final LocalDateTime foundedAt,
        final String manager,
        final String email,
        final String password,
        final String researchType,
        final String imageUrl,
        final String address,
        final boolean discussionSubmit,
        final int joinFee,
        final String description,
        final String officialUrl,
        final String socialMediaUrl
    ) {
        this.id = id;
        this.name = name;
        this.foundedAt = foundedAt;
        this.manager = manager;
        this.email = email;
        this.password = password;
        this.researchType = researchType;
        this.imageUrl = imageUrl;
        this.address = address;
        this.discussionSubmit = discussionSubmit;
        this.joinFee = joinFee;
        this.description = description;
        this.officialUrl = officialUrl;
        this.socialMediaUrl = socialMediaUrl;
    }
}
