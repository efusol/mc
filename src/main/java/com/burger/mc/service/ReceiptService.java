package com.burger.mc.service;

import com.burger.mc.dto.ReceiptDTO;

import java.util.List;

public interface ReceiptService {
    void registerReceipt(ReceiptDTO receiptDTO);
    List<ReceiptDTO> getReceiptsByMemberNo(Long m_no);
    boolean isDuplicateReceipt(Long rcNo);
}
