package com.burger.mc.service;

import com.burger.mc.dto.GoodsDTO;
import com.burger.mc.dto.CartDTO;
import com.burger.mc.mapper.GoodsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    private GoodsMapper goodsMapper;

    @Override
    public List<GoodsDTO> getGoodsByCategory(String category) {
        return goodsMapper.selectGoodsByCategory(category);
    }

    @Override
    public List<GoodsDTO> getGoodsByCategoryAndType(String category, String type) {
        return goodsMapper.selectGoodsByCategoryAndType(category, type);
    }

    @Override
    public GoodsDTO getProductById(long gNo) {
        return goodsMapper.selectProductById(gNo);
    }

    @Override
    public List<CartDTO> getCartItemsByMemberNo(long mNo) {
        List<CartDTO> cartItems = goodsMapper.selectCartItemsByMemberNo(mNo);

        return cartItems;
    }

    @Override
    public void addCart(CartDTO cartDTO) {
        goodsMapper.insertToCart(cartDTO);
    }

    @Override
    public void updateCartQuantity(CartDTO cartDTO) {
        goodsMapper.updateCartQuantity(cartDTO);
    }

    @Override
    public void removeFromCart(long mNo, long gNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("m_no", mNo);
        params.put("g_no", gNo);
        goodsMapper.deleteFromCart(params);
    }

    @Override
    @Transactional
    public String registerGoodsConfirm(Map<String, Object> newGoodsMap) throws DataAccessException {
        GoodsDTO goods = (GoodsDTO) newGoodsMap.get("item");
        List<String> images = (List<String>) newGoodsMap.get("imageFileList");
        long num = goodsMapper.insertNewGoods(goods);
        System.out.println("넘머머 " + num);
        long gNo = goods.getG_no();
        System.out.println("넘버버" + gNo);

        int result = 0;
        String message;

        if (images != null && gNo > 0) {
            result = goodsMapper.insertDetailImage(gNo, images);
        }

        if (gNo > 0) {
            message = (result > 0) ? "성공" : "부분 성공";
        } else {
            message = "실패";
        }

        return message;
    }

    @Override
    public String updateGoods(Map<String, Object> updateData) {
        GoodsDTO goodsDTO = (GoodsDTO) updateData.get("item");
        List<String> imageFileList = (List<String>) updateData.get("imageFileList");

        int goodsUpdateResult = goodsMapper.updateGoods(goodsDTO);

        // img_url이 존재할 때만 m_goods_image 테이블 업데이트
        if (imageFileList != null && !imageFileList.isEmpty()) {
            goodsDTO.setImg_url(imageFileList.get(0)); // 첫 번째 이미지를 설정
            goodsMapper.updateGoodsImage(goodsDTO);
        }

        return goodsUpdateResult > 0 ? "업데이트 성공" : "업데이트 실패";
    }



    @Override
    public void deleteGoods(long gNo) {
        goodsMapper.deleteGoods(gNo);
    }

    @Override
    public List<CartDTO> getCartItemsByIds(long[] cNoArray) {
        return goodsMapper.findByIds(cNoArray);
    }
}
