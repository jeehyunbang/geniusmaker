package com.example.genius_maker.conference.service;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import com.example.genius_maker.auth.repository.ConferenceMemberInfoRepository;
import com.example.genius_maker.conference.controller.response.SearchConferenceResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ConferenceService {

    private final ConferenceMemberInfoRepository conferenceMemberInfoRepository;

    public List<SearchConferenceResponse> searchConferences(String keyword, String region, String researchType) {
        // 검색 조건 적용
        Specification<ConferenceMemberInfo> spec = ConferenceSearchSpecification.searchByCriteria(keyword, region, researchType);
        List<ConferenceMemberInfo> results = conferenceMemberInfoRepository.findAll(spec);

        // 검색 결과를 DTO 형식으로 변환
        return results.stream()
            .map(info -> new SearchConferenceResponse(
                info.getId(),
                info.getImageUrl(), // thumbnail -> image_url
                info.getName(), // conferenceName -> name
                info.getAddress(), // organizationLocation -> address
                info.getResearchType() // category -> research_type
            ))
            .collect(Collectors.toList());
    }

    public ConferenceMemberInfo findById(final Long id) {
        return conferenceMemberInfoRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("해당 아이디에 일치하는 학회 정보가 없습니다. - " + id));
    }
}
