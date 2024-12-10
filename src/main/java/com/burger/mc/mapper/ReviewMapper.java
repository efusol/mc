package com.burger.mc.mapper;

import com.burger.mc.dto.ReviewDTO;
import com.burger.mc.dto.ReviewImageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReviewMapper {
    void insertReview(ReviewDTO reviewDTO);

    void insertReviewImage(ReviewImageDTO imageDTO);

    List<String> selectReviewImagesByReviewNo(Long reviewNo);

    void updateReviewedStatus(Long odNo);

    List<Map<String, Object>> selectReviewsWithImagesByGoodsNo(Long gNo);
}
