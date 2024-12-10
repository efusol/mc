package com.burger.mc.service;

import com.burger.mc.dto.CartDTO;
import com.burger.mc.dto.GoodsDTO;
import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Map;

public interface GoodsService {
    List<GoodsDTO> getGoodsByCategory(String category);

    List<GoodsDTO> getGoodsByCategoryAndType(String category, String type);

    GoodsDTO getProductById(long gNo);

    List<CartDTO> getCartItemsByMemberNo(long mNo);

    void addCart(CartDTO cartDTO);

    void updateCartQuantity(CartDTO cartDTO);

    void removeFromCart(long mNo, long gNo);

    String registerGoodsConfirm(Map<String, Object> newGoodsMap) throws DataAccessException;

    String updateGoods(Map<String, Object> updateGoodsMap) throws DataAccessException;

    List<CartDTO> getCartItemsByIds(long[] cNoArray);

    void deleteGoods(long gNo);
}
