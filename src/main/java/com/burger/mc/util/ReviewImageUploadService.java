package com.burger.mc.util;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ReviewImageUploadService {

    public List<String> uploadReviewImages(List<MultipartFile> files) {
        String root = "C:\\burgerreviews\\upload"; // 리뷰 이미지 저장 경로
        File fileCheck = new File(root);
        if (!fileCheck.exists()) fileCheck.mkdirs();

        List<String> savedFileNames = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                String ext = originalFileName.substring(originalFileName.lastIndexOf("."));
                String uuid = UUID.randomUUID().toString().replace("-", "");
                String savedFileName = uuid + ext;

                File savedFile = new File(root, savedFileName);
                file.transferTo(savedFile);

                savedFileNames.add(savedFileName); // 저장된 파일 이름 추가
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("이미지 업로드 실패");
        }
        return savedFileNames;
    }
}

