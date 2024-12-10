package com.burger.mc.service;

import com.burger.mc.dto.MemberDTO;
import com.burger.mc.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private MemberMapper memberMapper;

    MemberDTO memberDTO;

    @Override
    public int joinConfirm(MemberDTO memberDTO) throws DataAccessException {
        String password = passwordEncoder.encode(memberDTO.getM_pw());
        memberDTO.setM_pw(password);
        return memberMapper.insertMember(memberDTO);
    }

    @Override
    public Map<String, Object> loginConfirm(MemberDTO memberDTO) throws DataAccessException {
        Map<String, Object> resultMap = new HashMap<>();
        MemberDTO foundMember = memberMapper.selectMember(memberDTO.getM_email());

        if (foundMember != null) {
            if (passwordEncoder.matches(memberDTO.getM_pw(), foundMember.getM_pw())) {
                resultMap.put("findMember", foundMember);
            } else {
                resultMap.put("findMember", null);
                resultMap.put("message", "비밀번호가 틀립니다.");
            }
        } else {
            resultMap.put("findMember", null);
            resultMap.put("message", "계정이 존재하지 않습니다.");
        }

        return resultMap;
    }

    @Override
    public MemberDTO getMemberByNo(long m_no) {
        return memberMapper.selectMemberByNo(m_no);
    }

    @Override
    public void updateMember(MemberDTO memberDTO) {
        memberMapper.updateMember(memberDTO);
    }

    @Override
    public void updateMemberPoint(MemberDTO member) {
        memberMapper.updateMemberPoint(member); // 포인트 업데이트
    }

}
