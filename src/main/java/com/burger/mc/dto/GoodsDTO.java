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
public class GoodsDTO {
    private long g_no;
    private String g_category;
    private String g_type;
    private String g_name;
    private String g_english_name;
    private String g_content;
    private String g_sale_time;
    private long g_price;
    private Timestamp g_reg_date;
    private Timestamp g_mod_date;

    private long img_no;
    private String img_url;
    private Timestamp img_reg_date;
    private Timestamp img_mod_date;
}
