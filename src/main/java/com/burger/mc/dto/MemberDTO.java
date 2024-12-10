package com.burger.mc.dto;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO {
    private long m_no;
    private int m_year;
    private int m_month;
    private int m_day;
    private String m_email;
    private String m_pw;
    private String m_name;
    private String m_hp;
    private String m_zipcode;
    private String m_address;
    private String m_address_sub;
    private Timestamp m_reg_date;
    private Timestamp m_mod_date;
    private long point;
}
