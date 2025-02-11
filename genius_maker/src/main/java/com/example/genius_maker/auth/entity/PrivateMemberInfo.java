package com.example.genius_maker.auth.entity;

import com.example.genius_maker.common.audit.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PrivateMemberInfo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

    public PrivateMemberInfo(final String name, final Member member) {
        this(null, name, member);
    }

    public PrivateMemberInfo(final Long id, final String name, final Member member) {
        this.id = id;
        this.name = name;
        this.member = member;
    }
}
