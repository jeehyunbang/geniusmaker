package com.example.genius_maker.conference.controller.response;

public record SearchConferenceResponse(
    Long id, // id 컬럼 데이터
    String thumbnail, // image_url 컬럼 데이터
    String conferenceName, // name 컬럼 데이터
    String organizationLocation, // address 컬럼 데이터
    String category  // research_type 컬럼 데이터
) {
}
