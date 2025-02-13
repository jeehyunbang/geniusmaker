package com.example.genius_maker.conference.controller.response;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;

import java.time.LocalDateTime;

public record FindByIdConferenceInfoResponse(
    Long id,
    String name,
    LocalDateTime foundedAt,
    String manager,
    String email,
    String researchType,
    String conferenceAddress,
    String imageUrl,
    boolean discussionSubmit,
    int joinFee,
    String description,
    String officialUrl,
    String socialMediaUrl
) {
    public static FindByIdConferenceInfoResponse of(final ConferenceMemberInfo conferenceMemberInfo) {
        return new FindByIdConferenceInfoResponse(
            conferenceMemberInfo.getId(),
            conferenceMemberInfo.getName(),
            conferenceMemberInfo.getFoundedAt(),
            conferenceMemberInfo.getManager(),
            conferenceMemberInfo.getEmail(),
            conferenceMemberInfo.getResearchType(),
            conferenceMemberInfo.getAddress(),
            conferenceMemberInfo.getImageUrl(),
            conferenceMemberInfo.isDiscussionSubmit(),
            conferenceMemberInfo.getJoinFee(),
            conferenceMemberInfo.getDescription(),
            conferenceMemberInfo.getOfficialUrl(),
            conferenceMemberInfo.getSocialMediaUrl()
        );
    }
}
