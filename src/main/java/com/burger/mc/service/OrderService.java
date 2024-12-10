package com.burger.mc.service;

import com.burger.mc.dto.OrderDTO;
import com.burger.mc.dto.OrderDetailDTO;

import java.util.List;
import java.util.Map;

public interface OrderService {
    int orderRegister(OrderDTO orderDTO, List<OrderDetailDTO> orderDetails);

    List<OrderDTO> getOrdersByMemberNo(Long mNo, int pageNum, int amount);

    int getTotalOrdersByMemberNo(Long mNo);

    List<Map<String, Object>> getOrderDetails(Long oNo);

    int getTotalUsedPointsByMemberNo(Long mNo);

    List<Map<String, Object>> getUsedPointsByMemberNo(Long mNo, int pageNum, int amount);

    Map<String, Object> getTotalOrdersAndPointByMemberNo(Long mNo);
}
