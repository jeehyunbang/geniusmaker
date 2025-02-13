package com.example.genius_maker.auth.repository;

import com.example.genius_maker.auth.entity.PrivateMemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrivateMemberInfoRepository extends JpaRepository<PrivateMemberInfo, Long> {

    Optional<PrivateMemberInfo> findByEmail(String email);

    Optional<PrivateMemberInfo> findByPersonalValue(String personalValue);
}
