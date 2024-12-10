package com.burger.mc.controller;

import com.burger.mc.dto.ReviewDTO;
import com.burger.mc.dto.ReviewImageDTO;
import com.burger.mc.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/register")
    public Map<String, Object> registerReview(
            @RequestParam("g_no") Long gNo,
            @RequestParam("o_d_no") Long oDNo,
            @RequestParam("m_no") Long mNo,
            @RequestParam("rating") int rating,
            @RequestParam("comment") String comment,
            @RequestParam(value = "files", required = false) List<MultipartFile> files
    ) {
        // 파일 첨부 개수 제한 로직
        if (files != null && files.size() > 3) {
            throw new IllegalArgumentException("사진은 최대 3장까지만 업로드할 수 있습니다.");
        }

        ReviewDTO reviewDTO = ReviewDTO.builder()
                .gNo(gNo)
                .oDNo(oDNo)
                .mNo(mNo)
                .rating(rating)
                .comment(comment)
                .build();

        reviewService.registerReview(reviewDTO, files);

        // 응답 데이터에 reviewed 상태 포함
        Map<String, Object> response = new HashMap<>();
        response.put("o_d_no", oDNo);
        response.put("reviewed", "Y");
        return response;
    }


    // 특정 상품의 리뷰 조회
    @GetMapping("/goods/{gNo}")
    public List<Map<String, Object>> getReviewsByGoodsNo(@PathVariable Long gNo) {
        List<Map<String, Object>> reviews = reviewService.getReviewsWithImagesByGoodsNo(gNo);
        return reviews;
    }

    @GetMapping("/image/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getReviewImage(@PathVariable String filename) {
        Path filePath = Paths.get("C:/burgerreviews/upload/" + filename); // 리뷰 이미지 경로
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        MediaType mediaType;
        switch (extension) {
            case "jpg":
            case "jpeg":
                mediaType = MediaType.IMAGE_JPEG;
                break;
            case "png":
                mediaType = MediaType.IMAGE_PNG;
                break;
            case "gif":
                mediaType = MediaType.IMAGE_GIF;
                break;
            default:
                mediaType = MediaType.APPLICATION_OCTET_STREAM; // 기타 확장자 처리
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(resource);
    }

}
