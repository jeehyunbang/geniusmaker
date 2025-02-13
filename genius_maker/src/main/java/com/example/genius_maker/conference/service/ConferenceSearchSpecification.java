package com.example.genius_maker.conference.service;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ConferenceSearchSpecification {

    public static Specification<ConferenceMemberInfo> searchByCriteria(String keyword, String region, String researchType) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. keyword가 있는 경우 (name, researchType, description에서 검색)
            if (keyword != null && !keyword.isBlank()) {
                String likePattern = "%" + keyword + "%";
                Predicate namePredicate = criteriaBuilder.like(root.get("name"), likePattern);
                Predicate researchPredicate = criteriaBuilder.like(root.get("researchType"), likePattern);
                Predicate descriptionPredicate = criteriaBuilder.like(root.get("description"), likePattern);
                predicates.add(criteriaBuilder.or(namePredicate, researchPredicate, descriptionPredicate));
            }

            // 2. region이 있는 경우 (address 컬럼과 일치 여부 확인)
            if (region != null && !region.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("address"), region));
            }

            // 3. researchType이 있는 경우 (research_type 컬럼과 일치 여부 확인)
            if (researchType != null && !researchType.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("researchType"), researchType));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}