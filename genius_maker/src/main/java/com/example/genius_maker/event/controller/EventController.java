package com.example.genius_maker.event.controller;

import com.example.genius_maker.common.controller.response.ApiResponse;
import com.example.genius_maker.event.controller.request.SaveEventRequest;
import com.example.genius_maker.event.controller.response.FindByEventById;
import com.example.genius_maker.event.controller.response.SearchEventResponseList;
import com.example.genius_maker.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/search")
    public ApiResponse<SearchEventResponseList> searchEvents(@RequestParam(required = false) String keyword) {
        return ApiResponse.successWithData(
            "행사 정보 검색 성공",
            new SearchEventResponseList(eventService.searchEvents(keyword))
        );
    }

    @GetMapping("/{eventId}")
    public ApiResponse<FindByEventById> findById(@PathVariable Long eventId) {
        return ApiResponse.successWithData(
            "행사 정보 검색 성공!",
            FindByEventById.of(eventService.getById(eventId))
        );
    }

    @PostMapping("/")
    public ApiResponse<Void> saveEvent(@RequestBody SaveEventRequest request) {
        eventService.save(request);
        return ApiResponse.success("행사 정보 등록 성공!");
    }
}
