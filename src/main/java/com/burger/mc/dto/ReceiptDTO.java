package com.burger.mc.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReceiptDTO {
    private Long rc_no;
    private Long m_no;
    private Integer total_amount;
    private Integer rc_point;
    private LocalDateTime rc_reg_date;
}
