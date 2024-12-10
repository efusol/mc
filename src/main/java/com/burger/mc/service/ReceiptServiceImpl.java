package com.burger.mc.service;

import com.burger.mc.dto.ReceiptDTO;
import com.burger.mc.mapper.ReceiptMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceiptServiceImpl implements ReceiptService {

    private final ReceiptMapper receiptMapper;

    @Override
    @Transactional
    public void registerReceipt(ReceiptDTO receiptDTO) {
        receiptMapper.insertReceipt(receiptDTO);

        receiptMapper.updateMemberPoint(receiptDTO.getM_no(), receiptDTO.getRc_point());
    }

    @Override
    public List<ReceiptDTO> getReceiptsByMemberNo(Long m_no) {
        return receiptMapper.selectReceiptsByMemberNo(m_no);
    }

    @Override
    public boolean isDuplicateReceipt(Long rc_no) {
        return receiptMapper.countByRcNo(rc_no) > 0; // 중복 여부 확인
    }
}
