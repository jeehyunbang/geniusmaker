package com.example.genius_maker.auth.service;

import com.example.genius_maker.auth.controller.request.SaveConferenceMemberInfoRequest;
import com.example.genius_maker.auth.controller.request.SavePrivateMemberInfoRequest;
import com.example.genius_maker.auth.controller.response.MemberInfoResponse;
import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import com.example.genius_maker.auth.entity.PrivateMemberInfo;
import com.example.genius_maker.auth.repository.ConferenceMemberInfoRepository;
import com.example.genius_maker.auth.repository.PrivateMemberInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {

    private final PrivateMemberInfoRepository privateMemberInfoRepository;
    private final ConferenceMemberInfoRepository conferenceMemberInfoRepository;
    private final JwtHandler jwtHandler;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void savePrivateMemberInfo(final SavePrivateMemberInfoRequest request) {
        final String personalValue = UUID.randomUUID().toString();
        final PrivateMemberInfo privateMemberInfo = new PrivateMemberInfo(
            request.email(),
            passwordEncoder.encrypt(request.password()),
            request.name(),
            request.team(),
            request.interestResearch(),
            personalValue
        );
        privateMemberInfoRepository.save(privateMemberInfo);
    }

    @Transactional
    public void saveConferenceMemberInfo(final SaveConferenceMemberInfoRequest request) {
        final String personalValue = UUID.randomUUID().toString();
        final ConferenceMemberInfo conferenceMemberInfo = new ConferenceMemberInfo(
            request.name(),
            request.foundedAt(),
            request.manager(),
            request.email(),
            passwordEncoder.encrypt(request.password()),
            request.researchType(),
            request.imageUrl(),
            request.conferenceAddress(),
            request.discussionSubmit(),
            request.joinFee(),
            request.description(),
            request.officialUrl(),
            request.socialMediaUrl(),
            personalValue
        );
        conferenceMemberInfoRepository.save(conferenceMemberInfo);
    }

    public String login(final String email, final String password) {
        final Optional<PrivateMemberInfo> privateMemberInfo = privateMemberInfoRepository.findByEmail(email);
        final Optional<ConferenceMemberInfo> conferenceMemberInfo = conferenceMemberInfoRepository.findByEmail(email);

        if (privateMemberInfo.isPresent()) {
            final PrivateMemberInfo member = privateMemberInfo.get();
            checkPassword(password, member.getPassword());
            return jwtHandler.generateToken(member.getPersonalValue());
        } else if (conferenceMemberInfo.isPresent()) {
            final ConferenceMemberInfo member = conferenceMemberInfo.get();
            checkPassword(password, member.getPassword());
            return jwtHandler.generateToken(member.getPersonalValue());
        }

        throw new EntityNotFoundException("이메일에 일치하는 회원 데이터가 존재하지 않습니다.");
    }

    private void checkPassword(final String password, final String encryptedPassword) {
        if (!passwordEncoder.match(password, encryptedPassword)) {
            throw new IllegalArgumentException("잘못된 비밀번호 입니다.");
        }
    }

    public MemberInfoResponse getMemberInfo(final String personalValue) {
        final Optional<PrivateMemberInfo> privateMemberInfo = privateMemberInfoRepository.findByPersonalValue(personalValue);
        final Optional<ConferenceMemberInfo> conferenceMemberInfo = conferenceMemberInfoRepository.findByPersonalValue(personalValue);

        if (privateMemberInfo.isPresent()) {
            return new MemberInfoResponse(
                privateMemberInfo.get().getName(),
                privateMemberInfo.get().getEmail()
            );
        } else if (conferenceMemberInfo.isPresent()) {
            return new MemberInfoResponse(
                conferenceMemberInfo.get().getName(),
                conferenceMemberInfo.get().getEmail()
            );
        }

        throw new EntityNotFoundException("회원 정보가 존재하지 않습니다.");
    }
}
