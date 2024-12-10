package com.burger.mc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewImageDTO {
    private Long reviewImgNo;
    private Long reviewNo;
    private String reviewImgUrl;
    private LocalDateTime reviewImgRegDate;
    private LocalDateTime reviewImgModDate;
}
