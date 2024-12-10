package com.burger.mc.mapper;

import com.burger.mc.dto.OrderDTO;
import com.burger.mc.dto.OrderDetailDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.*;

@Mapper
public interface OrderMapper {

    void insertOrder(OrderDTO order);

    void insertOrderDetail(OrderDetailDTO orderDetail);

    void deleteCartItemsByMemberNo(@Param("m_no") long memberNo);

    List<OrderDTO> getOrdersByMemberNo(@Param("m_no") Long mNo, @Param("offset") int offset, @Param("amount") int amount);

    int getTotalOrdersByMemberNo(@Param("m_no") Long mNo);

    List<Map<String, Object>> selectOrderDetails(@Param("o_no") Long o_no);

    List<Map<String, Object>> getUsedPointsByMemberNo(@Param("m_no") Long mNo, @Param("offset") int offset, @Param("amount") int amount);

    int getTotalUsedPointsByMemberNo(@Param("m_no") Long mNo);

    Map<String, Object> getTotalOrdersAndPointByMemberNo(Long mNo);
}
