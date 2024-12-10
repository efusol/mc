package com.burger.mc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailDTO {
    private long o_d_no;
    private long o_no;
    private long g_no;
    private int o_d_qty;
    private String g_name;
    private long g_price;
    private String img_url;
    private String reviewed;
}
