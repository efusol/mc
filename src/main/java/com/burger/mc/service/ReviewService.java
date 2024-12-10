package com.burger.mc.service;

import com.burger.mc.dto.ReviewDTO;
import com.burger.mc.dto.ReviewImageDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    void registerReview(ReviewDTO reviewDTO, List<MultipartFile> files);

    List<Map<String, Object>> getReviewsWithImagesByGoodsNo(Long gNo);
}
