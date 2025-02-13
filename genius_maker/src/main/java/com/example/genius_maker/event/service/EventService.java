package com.example.genius_maker.event.service;

import com.example.genius_maker.event.controller.request.SaveEventRequest;
import com.example.genius_maker.event.controller.response.SearchEventsResponse;
import com.example.genius_maker.event.repository.Event;
import com.example.genius_maker.event.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<SearchEventsResponse> searchEvents(String keyword, String region, String eventType) {
        // 검색 조건 적용
        Specification<Event> spec = EventSearchSpecification.searchByKeywordAndFilters(keyword, region, eventType);
        List<Event> results = eventRepository.findAll(spec);

        // 검색 결과를 DTO로 변환하여 반환
        return results.stream()
            .map(event -> new SearchEventsResponse(
                event.getId(),
                event.getName(),
                event.getImageUrl(),
                event.getRegion(),
                event.getType(),
                event.isOffline()
            ))
            .collect(Collectors.toList());
    }

    public Event getById(final Long id) {
        return eventRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("해당 id의 행사 정보가 존재하지 않습니다. - " + id));
    }

    @Transactional
    public void save(final SaveEventRequest request) {
        final Event event = new Event(
            request.name(),
            request.imageUrl(),
            request.organizer(),
            request.eventType(),
            request.region(),
            request.eventStartAt(),
            request.eventEndAt(),
            request.fee(),
            request.officialUrl(),
            request.joinUrl(),
            request.description(),
            request.offline()
        );
        eventRepository.save(event);
    }

    public List<String> getExposeImages() {
        return eventRepository.findTop5ByOrderByEndAtDesc()
            .stream()
            .map(Event::getImageUrl)
            .toList();
    }
}
