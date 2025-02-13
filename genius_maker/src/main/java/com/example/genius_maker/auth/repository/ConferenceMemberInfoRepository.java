package com.example.genius_maker.auth.repository;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ConferenceMemberInfoRepository extends JpaRepository<ConferenceMemberInfo, Long>, JpaSpecificationExecutor<ConferenceMemberInfo> {

    Optional<ConferenceMemberInfo> findByEmail(String email);
}
