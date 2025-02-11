package com.example.genius_maker.auth.repository;

import com.example.genius_maker.auth.entity.Member;
import com.example.genius_maker.auth.entity.PrivateMemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivateMemberInfoRepository extends JpaRepository<PrivateMemberInfo, Long> {

    void deleteAllByMember(Member member);
}
