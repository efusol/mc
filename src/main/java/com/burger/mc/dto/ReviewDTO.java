package com.burger.mc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Long reviewNo;
    private String comment;
    private int rating;
    private Long gNo;
    private Long oDNo;
    private Long mNo;
    private LocalDateTime reviewRegDate;
    private LocalDateTime reviewModDate;

    private List<ReviewImageDTO> reviewImages;
}
