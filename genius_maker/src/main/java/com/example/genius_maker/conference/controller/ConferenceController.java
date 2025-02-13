package com.example.genius_maker.conference.controller;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import com.example.genius_maker.common.controller.response.ApiResponse;
import com.example.genius_maker.conference.controller.response.FindByIdConferenceInfoResponse;
import com.example.genius_maker.conference.controller.response.SearchConferenceResponseList;
import com.example.genius_maker.conference.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/conference")
@RestController
public class ConferenceController {

    private final ConferenceService conferenceService;

    @GetMapping("/search")
    public ApiResponse<SearchConferenceResponseList> searchConferences(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String region,
        @RequestParam(required = false) String researchType
    ) {
        return ApiResponse.successWithData(
            "학회 정보 검색 성공",
            new SearchConferenceResponseList(conferenceService.searchConferences(keyword, region, researchType))
        );
    }

    @GetMapping("/{conferenceId}")
    public ApiResponse<FindByIdConferenceInfoResponse> findById(
        @PathVariable Long conferenceId
    ) {
        final ConferenceMemberInfo conferenceMemberInfo = conferenceService.findById(conferenceId);
        return ApiResponse.successWithData(
            "학회 정보 검색 성공!",
            FindByIdConferenceInfoResponse.of(conferenceMemberInfo)
        );
    }
}
