package com.burger.mc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private long o_no;
    private String o_id;
    private long m_no;
    private String o_name;
    private long o_total_price;
    private String o_d_phone;
    private String o_zipcode;
    private String o_address;
    private Timestamp o_reg_date;
    private long used_points;
}
