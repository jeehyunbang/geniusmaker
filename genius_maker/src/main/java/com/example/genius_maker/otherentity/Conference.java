package com.example.genius_maker.otherentity;

import com.example.genius_maker.auth.entity.Member;
import com.example.genius_maker.common.audit.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "conference")
@Entity
public class Conference extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "thumbnail_url", length = 1000, nullable = false)
    private String thumbnailUrl;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "region", length = 100, nullable = false)
    private String region;

    @Column(name = "category", length = 20, nullable = false)
    private String category;

    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    @Column(name = "fee", nullable = false)
    private int fee;

    @Column(name = "join_path", length = 500, nullable = false)
    private String joinPath;

    @Column(name = "contact", length = 100, nullable = false)
    private String contact;

    @JoinColumn(name = "member_id")
    @OneToOne(fetch = FetchType.LAZY)
    private Member member;
}
