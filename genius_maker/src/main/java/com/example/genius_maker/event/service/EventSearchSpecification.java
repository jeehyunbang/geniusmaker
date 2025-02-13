package com.example.genius_maker.event.service;

import com.example.genius_maker.event.repository.Event;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class EventSearchSpecification {

    public static Specification<Event> searchByKeywordAndFilters(String keyword, String region, String eventType) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. keyword가 있는 경우 (name, type, description에서 검색)
            if (keyword != null && !keyword.isBlank()) {
                String likePattern = "%" + keyword + "%";
                Predicate namePredicate = criteriaBuilder.like(root.get("name"), likePattern);
                Predicate typePredicate = criteriaBuilder.like(root.get("type"), likePattern);
                Predicate descriptionPredicate = criteriaBuilder.like(root.get("description"), likePattern);
                predicates.add(criteriaBuilder.or(namePredicate, typePredicate, descriptionPredicate));
            }

            // 2. region이 있는 경우 (완전 일치)
            if (region != null && !region.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("region"), region));
            }

            // 3. eventType이 있는 경우 (완전 일치)
            if (eventType != null && !eventType.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("type"), eventType));
            }

            // AND 조건으로 모든 필터 적용
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
