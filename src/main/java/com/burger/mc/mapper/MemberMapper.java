package com.burger.mc.mapper;

import com.burger.mc.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    public int insertMember(MemberDTO memberDTO);

    public MemberDTO selectMember(@Param("m_email") String m_email);

    MemberDTO selectMemberByNo(long mNo);

    void updateMember(MemberDTO memberDTO);

    void updateMemberPoint(MemberDTO member);
}
