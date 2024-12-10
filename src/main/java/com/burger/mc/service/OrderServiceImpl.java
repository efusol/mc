package com.burger.mc.service;

import com.burger.mc.dto.OrderDTO;
import com.burger.mc.dto.OrderDetailDTO;
import com.burger.mc.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;

    @Transactional
    public int orderRegister(OrderDTO orderDTO, List<OrderDetailDTO> orderDetailItems) {
        // 주문 정보 저장
        orderMapper.insertOrder(orderDTO);

        // 주문 번호 설정 후 주문 상세 정보 저장
        for (OrderDetailDTO detail : orderDetailItems) {
            detail.setO_no(orderDTO.getO_no()); // 자동 생성된 주문 번호를 상세 정보에 설정
            orderMapper.insertOrderDetail(detail);
        }

        orderMapper.deleteCartItemsByMemberNo(orderDTO.getM_no());

        return 1; // 성공 시 1 반환
    }

    @Override
    public List<OrderDTO> getOrdersByMemberNo(Long mNo, int pageNum, int amount) {
        int offset = (pageNum - 1) * amount; // 페이지 번호를 기반으로 오프셋 계산
        return orderMapper.getOrdersByMemberNo(mNo, offset, amount);
    }

    @Override
    public int getTotalOrdersByMemberNo(Long mNo) {
        return orderMapper.getTotalOrdersByMemberNo(mNo);
    }

    @Override
    public List<Map<String, Object>> getOrderDetails(Long o_no) {
        // 주문 상세 정보 가져오기
        return orderMapper.selectOrderDetails(o_no);
    }

    @Override
    public List<Map<String, Object>> getUsedPointsByMemberNo(Long mNo, int pageNum, int amount) {
        int offset = (pageNum - 1) * amount; // 페이지네이션 offset 계산
        return orderMapper.getUsedPointsByMemberNo(mNo, offset, amount);
    }

    @Override
    public int getTotalUsedPointsByMemberNo(Long mNo) {
        return orderMapper.getTotalUsedPointsByMemberNo(mNo);
    }

    @Override
    public Map<String, Object> getTotalOrdersAndPointByMemberNo(Long mNo) {
        return orderMapper.getTotalOrdersAndPointByMemberNo(mNo);
    }


}
