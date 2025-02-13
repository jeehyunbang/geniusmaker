package com.example.genius_maker.auth.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "private_member_info")
@Entity
public class PrivateMemberInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "password", length = 1000, nullable = false)
    private String password;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "team", length = 100, nullable = true)
    private String team;

    @Column(name = "interest_research", length = 100, nullable = true)
    private String interestResearch;

    public PrivateMemberInfo(
        final String email,
        final String password,
        final String name,
        final String team,
        final String interestResearch
    ) {
        this(
            null,
            email,
            password,
            name,
            team,
            interestResearch
        );
    }

    public PrivateMemberInfo(
        final Long id,
        final String email,
        final String password,
        final String name,
        final String team,
        final String interestResearch
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.team = team;
        this.interestResearch = interestResearch;
    }
}
