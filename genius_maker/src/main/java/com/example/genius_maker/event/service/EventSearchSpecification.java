package com.example.genius_maker.event.service;

import com.example.genius_maker.event.repository.Event;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class EventSearchSpecification {

    public static Specification<Event> searchByKeyword(String keyword) {
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

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}