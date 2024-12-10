package com.burger.mc.controller;

import com.burger.mc.dto.CartDTO;
import com.burger.mc.dto.GoodsDTO;
import com.burger.mc.service.GoodsService;
import com.burger.mc.util.MultiUploadFileService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/goods")
public class GoodsController {

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private MultiUploadFileService multiUploadFileService;

    @PostMapping("/goodsList")
    public List<GoodsDTO> getGoodsByCategory(@RequestParam("category") String category,
                                             @RequestParam(value = "type", required = false) String type) {
        if (type != null) {
            return goodsService.getGoodsByCategoryAndType(category, type);
        } else {
            return goodsService.getGoodsByCategory(category);
        }
    }

    @GetMapping("/detail/{gNo}")
    public GoodsDTO getProductById(@PathVariable("gNo") long gNo) {
        return goodsService.getProductById(gNo);
    }

    @GetMapping("/cartList")
    public List<CartDTO> getCartList(@RequestParam("m_no") long m_no) {
        System.out.println("Member ID (m_no): " + m_no);
        return goodsService.getCartItemsByMemberNo(m_no);
    }

    @PostMapping("/addToCart")
    public void addToCart(@RequestBody Map<String, Object> requestData, HttpSession session) {

        long g_no = Long.parseLong(requestData.get("g_no").toString());
        int c_quantity = Integer.parseInt(requestData.get("c_quantity").toString());
        long m_no = Long.parseLong(requestData.get("m_no").toString());

        CartDTO cartDTO = new CartDTO(g_no, m_no, c_quantity);
        goodsService.addCart(cartDTO);
    }


    @PostMapping("/updateCartQuantity")
    public void updateCartQuantity(@RequestBody Map<String, Object> requestData) {
        long g_no = Long.parseLong(requestData.get("g_no").toString());
        int c_quantity = Integer.parseInt(requestData.get("c_quantity").toString());
        long m_no = Long.parseLong(requestData.get("m_no").toString());
        CartDTO cartDTO = new CartDTO(g_no, m_no, c_quantity);
        goodsService.updateCartQuantity(cartDTO);
    }

    @DeleteMapping("/removeFromCart")
    public void removeFromCart(@RequestParam("g_no") long g_no, @RequestParam("m_no") long m_no) {
        goodsService.removeFromCart(m_no, g_no);
    }


    @PostMapping(value = "/registerGoodsConfirm", produces = "text/plain; charset=UTF-8")
    public String registerGoodsConfirm(@RequestPart(value = "item") GoodsDTO goodsDTO,
                                       @RequestPart(value = "file", required = false) List<MultipartFile> files) {
        Map<String, Object> newGoodsMap = new HashMap<>();
        newGoodsMap.put("item", goodsDTO);
        if (files != null && !files.isEmpty()) {
            List<String> imageFileList = multiUploadFileService.multiUpload(files);
            newGoodsMap.put("imageFileList", imageFileList);
        }
        String message = goodsService.registerGoodsConfirm(newGoodsMap);
        System.out.println(message);
        return message;
    }

    @GetMapping("/image/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        Path filePath = Paths.get("C:/burgergoods/upload/" + filename);
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
                mediaType = MediaType.APPLICATION_OCTET_STREAM; // 알 수 없는 확장자는 일반 파일로 처리
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(resource);
    }

    @PostMapping(value = "/updateGoods", produces = "text/plain; charset=UTF-8")
    public String updateGoods(@RequestPart(value = "item") GoodsDTO goodsDTO,
                              @RequestPart(value = "file", required = false) List<MultipartFile> files) {
        try {
            // 파일 업로드 처리
            List<String> imageFileList = null;
            if (files != null && !files.isEmpty()) {
                imageFileList = multiUploadFileService.multiUpload(files);
                if (!imageFileList.isEmpty()) {
                    goodsDTO.setImg_url(imageFileList.get(0)); // GoodsDTO에 이미지 URL 설정
                }
            }

            // Map에 goodsDTO와 imageFileList를 담아서 전달
            Map<String, Object> updateData = new HashMap<>();
            updateData.put("item", goodsDTO);
            updateData.put("imageFileList", imageFileList);

            String resultMessage = goodsService.updateGoods(updateData);
            return resultMessage;

        } catch (Exception e) {
            e.printStackTrace();
            return "업데이트 실패";
        }
    }




    @DeleteMapping("/deleteGoods")
    public ResponseEntity<String> deleteGoods(@RequestParam("g_no") long gNo) {
        try {
            goodsService.deleteGoods(gNo);
            return ResponseEntity.ok("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패");
        }
    }

    @GetMapping("/cartItems")
    public List<CartDTO> getCartItemsByIds(@RequestParam("cNoArray") long[] cNoArray) {
        return goodsService.getCartItemsByIds(cNoArray);
    }
}
