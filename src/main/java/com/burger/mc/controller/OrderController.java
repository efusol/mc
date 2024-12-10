package com.burger.mc.controller;

import com.burger.mc.dto.OrderDTO;
import com.burger.mc.service.OrderService;
import com.burger.mc.util.PageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getOrderList(
            @RequestParam Long m_no,       // 회원 번호
            @RequestParam int pageNum,     // 현재 페이지 번호
            @RequestParam int amount) {    // 한 페이지당 데이터 개수

        // 전체 게시물 수 조회
        int totArticles = orderService.getTotalOrdersByMemberNo(m_no);

        // PageVo 생성
        PageVo pageVo = new PageVo(
                (int) Math.ceil((double) pageNum / 10), // 페이지 그룹
                pageNum,
                amount,
                10, // 페이지 버튼에 표시할 페이지 수
                totArticles
        );

        // 현재 페이지 데이터 가져오기
        List<OrderDTO> orders = orderService.getOrdersByMemberNo(m_no, pageNum, amount);

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("pageInfo", pageVo);
        response.put("orders", orders);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<List<Map<String, Object>>> getOrderDetail(@RequestParam Long o_no) {
        // 주문 상세 정보 가져오기
        List<Map<String, Object>> orderDetails = orderService.getOrderDetails(o_no);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/total-orders-and-point")
    public ResponseEntity<Map<String, Object>> getTotalOrdersAndPoint(@RequestParam Long m_no) {
        try {
            Map<String, Object> result = orderService.getTotalOrdersAndPointByMemberNo(m_no);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }


    @GetMapping("/used-points")
    public ResponseEntity<Map<String, Object>> getUsedPoints(
            @RequestParam Long m_no,
            @RequestParam int pageNum,
            @RequestParam int amount
    ) {
        int totArticles = orderService.getTotalUsedPointsByMemberNo(m_no);

        PageVo pageVo = new PageVo(
                (int) Math.ceil((double) pageNum / 10), // 페이지 그룹
                pageNum,
                amount,
                10,
                totArticles
        );

        List<Map<String, Object>> usedPoints = orderService.getUsedPointsByMemberNo(m_no, pageNum, amount);

        Map<String, Object> response = new HashMap<>();
        response.put("pageInfo", pageVo);
        response.put("usedPoints", usedPoints);

        return ResponseEntity.ok(response);
    }

}
