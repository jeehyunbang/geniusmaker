package com.example.genius_maker.auth.service;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import com.example.genius_maker.auth.entity.Member;
import com.example.genius_maker.auth.entity.MemberType;
import com.example.genius_maker.auth.entity.PrivateMemberInfo;
import com.example.genius_maker.auth.repository.ConferenceMemberInfoRepository;
import com.example.genius_maker.auth.repository.MemberRepository;
import com.example.genius_maker.auth.repository.PrivateMemberInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final PrivateMemberInfoRepository privateMemberInfoRepository;
    private final ConferenceMemberInfoRepository conferenceMemberInfoRepository;
    private final JwtHandler jwtHandler;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void saveMember(
        final String email,
        final String password,
        final String name,
        final String memberTypeValue
    ) {
        final MemberType memberType = MemberType.valueOf(memberTypeValue.toUpperCase());
        final Member savedMember = memberRepository.save(
            new Member(
                memberType,
                email,
                passwordEncoder.encrypt(password)
            )
        );

        if (memberType == MemberType.PRIVATE) {
            privateMemberInfoRepository.save(new PrivateMemberInfo(name, savedMember));
        } else if (memberType == MemberType.CONFERENCE) {
            conferenceMemberInfoRepository.save(new ConferenceMemberInfo(name, savedMember));
        }
    }

    public String login(final String email, final String password) {
        final Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("해당 이메일의 회원이 존재하지 않습니다. - " + email));

        if (!passwordEncoder.match(password, member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호 입니다.");
        }

        return jwtHandler.generateToken(member.getId());
    }

    @Transactional
    public void deleteMember(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new EntityNotFoundException("해당 id의 회원이 존재하지 않습니다. - " + memberId));

        if (member.getMemberType() == MemberType.PRIVATE) {
            privateMemberInfoRepository.deleteAllByMember(member);
        } else if (member.getMemberType() == MemberType.CONFERENCE) {
            conferenceMemberInfoRepository.deleteAllByMember(member);
        }

        memberRepository.deleteById(memberId);
    }
}
