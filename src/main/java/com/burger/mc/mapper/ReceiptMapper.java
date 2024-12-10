package com.burger.mc.mapper;

import com.burger.mc.dto.ReceiptDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReceiptMapper {
    void insertReceipt(ReceiptDTO receiptDTO);

    List<ReceiptDTO> selectReceiptsByMemberNo(Long m_no);

    void updateMemberPoint(@Param("m_no") Long m_no, @Param("rc_point") int rc_point);

    int countByRcNo(@Param("rc_no") Long rc_no);
}
