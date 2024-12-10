package com.burger.mc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {
    private long g_no;
    private long m_no;
    private int c_quantity;
    private String g_name;
    private long g_price;
    private String img_url;

    public CartDTO(long g_no, long m_no, int c_quantity) {
        this.g_no = g_no;
        this.m_no = m_no;
        this.c_quantity = c_quantity;
    }

}