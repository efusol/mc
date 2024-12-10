package com.burger.mc.controller;

import com.burger.mc.dto.MemberDTO;
import com.burger.mc.dto.UpdateRequestDTO;
import com.burger.mc.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/joinConfirm")
    public ResponseEntity<Integer> joinConfirm(@RequestBody MemberDTO memberDTO) {
        System.out.println("asd" + memberDTO);
        int result = memberService.joinConfirm(memberDTO);
        if (result>0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @PostMapping("/loginConfirm")
    public ResponseEntity<Map<String, Object>> loginConfirm(@RequestBody MemberDTO memberDTO, HttpSession session) {
        Map<String, Object> map = memberService.loginConfirm(memberDTO);

        if (map.get("findMember") != null) {
            MemberDTO findMember = (MemberDTO) map.get("findMember");
            session.setAttribute("loginedMemberVo", findMember);

            if ("asd@asd".equals(findMember.getM_email())) {
                map.put("admin", true);
            } else {
                map.put("admin", false);
            }

            // 로그인 성공 시, 상태코드 200과 응답 반환
            return ResponseEntity.ok(map);
        } else {
            session.setAttribute("message", map.get("message"));

            // 로그인 실패 시, 상태코드 401과 메시지 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
        }
    }

    @GetMapping("/memberInfo")
    public ResponseEntity<MemberDTO> getMemberInfo(@RequestParam("m_no") long m_no) {
        // m_no로 사용자 정보 조회
        MemberDTO memberInfo = memberService.getMemberByNo(m_no);
        System.out.println(memberInfo.getPoint());
        if (memberInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(memberInfo);
    }

    @PostMapping("/updateInfo")
    public ResponseEntity<String> updateUserInfo(@RequestBody UpdateRequestDTO updateRequest) {
        try {
            // 사용자 정보 가져오기
            MemberDTO member = memberService.getMemberByNo(updateRequest.getM_no());
            if (member == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
            }

            // 현재 비밀번호 검증
            if (!passwordEncoder.matches(updateRequest.getM_pw(), member.getM_pw())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("현재 비밀번호가 일치하지 않습니다.");
            }

            if (updateRequest.getNew_m_pw() != null && !updateRequest.getNew_m_pw().equals(updateRequest.getNew_m_pwcheck())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            }

            if (updateRequest.getNew_m_pw() != null && updateRequest.getNew_m_pw().equals(updateRequest.getM_pw())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("현재 비밀번호와 새 비밀번호가 동일합니다. 다른 비밀번호를 설정해주세요.");
            }

            // 사용자 정보 업데이트
            if (updateRequest.getNew_m_pw() != null && !updateRequest.getNew_m_pw().isEmpty()) {
                member.setM_pw(passwordEncoder.encode(updateRequest.getNew_m_pw()));
            }
            member.setM_name(updateRequest.getM_name());
            member.setM_hp(updateRequest.getM_hp());
            member.setM_zipcode(updateRequest.getM_zipcode());
            member.setM_address(updateRequest.getM_address());
            member.setM_address_sub(updateRequest.getM_address_sub());

            memberService.updateMember(member);
            return ResponseEntity.ok("정보가 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("정보 수정 중 오류가 발생했습니다.");
        }
    }


}
