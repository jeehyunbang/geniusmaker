package com.example.genius_maker.auth.entity;

import com.example.genius_maker.common.audit.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 20, nullable = false)
    private MemberType memberType;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "password", length = 1000, nullable = false)
    private String password;

    public Member(MemberType memberType, String email, String password) {
        this(null, memberType, email, password);
    }

    public Member(final Long id, final MemberType memberType, final String email, final String password) {
        this.id = id;
        this.memberType = memberType;
        this.email = email;
        this.password = password;
    }
}
