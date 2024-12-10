package com.burger.mc.service;

import com.burger.mc.dto.ReviewDTO;
import com.burger.mc.dto.ReviewImageDTO;
import com.burger.mc.mapper.ReviewMapper;
import com.burger.mc.util.ReviewImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;

    @Autowired
    private ReviewImageUploadService reviewImageUploadService; // 새 서비스 주입

    @Override
    @Transactional
    public void registerReview(ReviewDTO reviewDTO, List<MultipartFile> files) {
        // 리뷰 등록
        reviewMapper.insertReview(reviewDTO);

        // 리뷰 이미지 저장
        if (files != null && !files.isEmpty()) {
            List<String> savedFileNames = reviewImageUploadService.uploadReviewImages(files);

            for (String fileName : savedFileNames) {
                ReviewImageDTO imageDTO = ReviewImageDTO.builder()
                        .reviewNo(reviewDTO.getReviewNo())
                        .reviewImgUrl(fileName)
                        .build();
                reviewMapper.insertReviewImage(imageDTO);
            }
        }

        // 주문 상세 테이블의 reviewed 상태 변경
        reviewMapper.updateReviewedStatus(reviewDTO.getODNo());
    }

    @Override
    public List<Map<String, Object>> getReviewsWithImagesByGoodsNo(Long gNo) {
        List<Map<String, Object>> reviews = reviewMapper.selectReviewsWithImagesByGoodsNo(gNo);

        for (Map<String, Object> review : reviews) {
            Long reviewNo = (Long) review.get("reviewNo");
            List<String> images = reviewMapper.selectReviewImagesByReviewNo(reviewNo);
            review.put("photos", images);
        }

        return reviews;
    }

}
