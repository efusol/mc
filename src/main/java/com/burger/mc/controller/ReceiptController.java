package com.burger.mc.controller;

import com.burger.mc.dto.ReceiptDTO;
import com.burger.mc.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/receipt")
public class ReceiptController {

    private final ReceiptService receiptService;

    // 특정 회원의 영수증 목록 조회
    @GetMapping
    public ResponseEntity<List<ReceiptDTO>> getReceipts(@RequestParam("m_no") Long m_no) {
        List<ReceiptDTO> receipts = receiptService.getReceiptsByMemberNo(m_no);
        return ResponseEntity.ok(receipts);
    }

    // 영수증 등록
    @PostMapping("/upload")
    public ResponseEntity<String> uploadReceipt(@RequestBody ReceiptDTO receiptDTO) {
        try {
            System.out.println("수신된 데이터: " + receiptDTO); // 디버깅 로그

            // 중복 영수증 확인
            boolean isDuplicate = receiptService.isDuplicateReceipt(receiptDTO.getRc_no());
            if (isDuplicate) {
                return ResponseEntity.status(409).body("중복된 영수증입니다.");
            }

            // 영수증 등록
            receiptService.registerReceipt(receiptDTO);
            return ResponseEntity.ok("영수증 등록 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("영수증 등록 실패");
        }
    }

}
