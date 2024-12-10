package com.burger.mc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateRequestDTO {
    private Long m_no;          // 사용자 번호 (필수)
    private String m_pw;  // 현재 비밀번호 (필수)
    private String new_m_pw;      // 새 비밀번호 (선택 사항)
    private String new_m_pwcheck; // 새 비밀번호 확인 (선택 사항)
    private String m_name;      // 이름
    private String m_hp;        // 전화번호
    private String m_zipcode;   // 우편번호
    private String m_address;   // 주소
    private String m_address_sub;
}
