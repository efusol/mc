package com.burger.mc.service;

import com.burger.mc.dto.MemberDTO;
import org.springframework.dao.DataAccessException;

import java.util.Map;

public interface MemberService {
    public int joinConfirm(MemberDTO memberDTO) throws DataAccessException;

    Map<String, Object> loginConfirm(MemberDTO memberDTO) throws DataAccessException;

    MemberDTO getMemberByNo(long mNo);

    void updateMember(MemberDTO member);

    void updateMemberPoint(MemberDTO member);
}
