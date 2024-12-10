package com.burger.mc.mapper;

import com.burger.mc.dto.GoodsDTO;
import com.burger.mc.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface GoodsMapper {

    List<GoodsDTO> selectGoodsByCategory(@Param("category") String category);

    List<GoodsDTO> selectGoodsByCategoryAndType(@Param("category") String category, @Param("type") String type);

    GoodsDTO selectProductById(@Param("gNo") long gNo);

    List<CartDTO> selectCartItemsByMemberNo(@Param("mNo") long mNo);

    void insertToCart(CartDTO cartDTO);

    void updateCartQuantity(CartDTO cartDTO);

    void deleteFromCart(Map<String, Object> params);

    long insertNewGoods(GoodsDTO goodsDTO);

    int insertDetailImage(@Param("gNo") long gNo, @Param("imageFileList") List<String> imageFileList);

    int updateGoods(GoodsDTO goodsDTO);

    List<CartDTO> findByIds(@Param("cNoArray") long[] cNoArray);

    void deleteGoods(long gNo);

    int updateGoodsImage(GoodsDTO goodsDTO);
}
