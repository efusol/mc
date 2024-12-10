package com.burger.mc.controller;

import com.burger.mc.dto.MemberDTO;
import com.burger.mc.dto.OrderDTO;
import com.burger.mc.dto.OrderDetailDTO;
import com.burger.mc.dto.OrderRequestDTO;
import com.burger.mc.service.MemberService;
import com.burger.mc.service.OrderService;
import com.burger.mc.service.RefundService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment")
public class PayController {

    @Autowired
    private MemberService memberService;

    private final OrderService orderService;
    private final RefundService refundService;

    private IamportClient iamportClient;

    @org.springframework.beans.factory.annotation.Value("${iamport.api_key}")
    private String iamportApiKey;

    @Value("${iamport.api_secret}")
    private String iamportApiSecret;

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(iamportApiKey, iamportApiSecret);
    }

    @PostMapping("/verify/{imp_uid}")
    public ResponseEntity<IamportResponse<Payment>> paymentByImpUid(@PathVariable("imp_uid") String imp_uid) {
        try {
            IamportResponse<Payment> response = iamportClient.paymentByImpUid(imp_uid);
            return ResponseEntity.ok(response);
        } catch (IamportResponseException | IOException e) {
            log.error("결제 검증 오류:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Transactional
    @PostMapping("/orderRegister")
    public ResponseEntity<Integer> orderRegister(@RequestBody OrderRequestDTO orderRequestDTO) {
        OrderDTO orderDTO = orderRequestDTO.getOrder();
        try {
            List<OrderDetailDTO> orderDetails = orderRequestDTO.getCheckOutList();

            // 포인트 사용 및 적립 로직 추가
            long usedPoints = orderDTO.getUsed_points(); // 사용된 포인트
            long totalAmount = orderDTO.getO_total_price(); // 결제 금액
            long m_no = orderDTO.getM_no(); // 사용자 ID

            // 사용자 정보 가져오기
            MemberDTO member = memberService.getMemberByNo(m_no);

            // 1. 포인트 차감 처리
            if (usedPoints > 0) {
                // 100 단위로만 사용 가능
                if (usedPoints % 100 != 0) {
                    return ResponseEntity.badRequest().body(-1); // 100 단위가 아니면 오류
                }
                if (usedPoints > member.getPoint()) {
                    return ResponseEntity.badRequest().body(-2); // 사용 가능한 포인트 초과
                }
                member.setPoint(member.getPoint() - usedPoints); // 포인트 차감
            }

            // 2. 주문 등록 처리
            int result = orderService.orderRegister(orderDTO, orderDetails);

            // 3. 포인트 적립 처리
            int earnedPoints = (int) Math.floor(totalAmount * 0.01); // 정확히 1% 적립
            member.setPoint(member.getPoint() + earnedPoints);

            // 4. 사용자 정보 업데이트
            memberService.updateMemberPoint(member);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("주문 등록 오류:", e);

            // 결제 취소 처리
            try {
                String token = refundService.getToken(iamportApiKey, iamportApiSecret);
                refundService.refundRequest(token, orderDTO.getO_id(), e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1);
            } catch (Exception refundEx) {
                log.error("결제 취소 오류:", refundEx);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1);
            }
        }
    }

    @GetMapping("/paymentCancel")
    public ResponseEntity paymentCancel(@RequestParam("order_id") String order_id) throws Exception {
        // 결제취소
        log.info("주문 상품 환불 진행 : 주문 번호 {}", order_id);
        String token = null;
        try {
            token = refundService.getToken(iamportApiKey, iamportApiSecret);
        } catch (IOException e1) {
            e1.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("실패");
        }
        try {
            refundService.refundRequest(token, order_id, "결제취소");
            return ResponseEntity.ok("성공");
        } catch (IOException e2) {
            e2.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("실패");
        }
    }

}
