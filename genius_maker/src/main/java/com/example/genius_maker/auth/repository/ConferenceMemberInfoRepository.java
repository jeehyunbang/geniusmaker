package com.example.genius_maker.auth.repository;

import com.example.genius_maker.auth.entity.ConferenceMemberInfo;
import com.example.genius_maker.auth.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConferenceMemberInfoRepository extends JpaRepository<ConferenceMemberInfo, Long> {

    void deleteAllByMember(Member member);
}
