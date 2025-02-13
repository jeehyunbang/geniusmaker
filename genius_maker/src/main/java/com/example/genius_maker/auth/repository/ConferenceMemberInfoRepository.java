package com.example.genius_maker.auth.repository;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConferenceMemberInfoRepository extends JpaRepository<ConferenceMemberInfo, Long> {

    Optional<ConferenceMemberInfo> findByEmail(String email);
}
