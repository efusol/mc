import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/goods/GoodsDetailView.css';
import { useSelector } from 'react-redux';

const GoodsDetailView = () => {
  const { g_no } = useParams(); // URL에서 상품 번호 가져오기
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartPopupVisible, setCartPopupVisible] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.member.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/goods/detail/${g_no}`);
        setProduct(response.data);
        setTotalPrice(response.data.g_price);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('상품 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchProduct();
  }, [g_no]);

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      setTotalPrice(newQuantity * product.g_price);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        setTotalPrice(newQuantity * product.g_price);
        return newQuantity;
      }
      return prev;
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/member/login');
      return;
    }
    console.log("유저번호" + user.m_no);
    console.log("넘버 : " + product.g_no + " 수량 : " + quantity);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/goods/addToCart`, {
        g_no: product.g_no,
        c_quantity: quantity,
        m_no: user.m_no,
      });

      if (response.status === 200) {
        setCartPopupVisible(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('장바구니에 추가하는 데 오류가 발생했습니다.');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-info">
        <h1>{product.g_name}</h1>
        <h2>{product.g_english_name}</h2>

        <div className="product-image">
          <img src={`${import.meta.env.VITE_API_URL}/goods/image/${product.img_url}`} alt={product.g_name} />
        </div>

        <div className="product-description">
          <p>{product.g_content}</p>
          <Link to={`/review/${g_no}`} className="review-link">
            리뷰 보러 가기 →
          </Link>
        </div>
      </div>

      <div className="product-purchase">
        <span className="product-price">{product.g_price}원</span>

        <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <input id="quantity" type="text" value={quantity} readOnly />
          <button onClick={handleIncrease}>+</button>
        </div>

        <div className="total-price">
          합계: <span>{totalPrice}</span>원
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          카트에 추가
        </button>

        <div className="sale-time">
          *판매시간: <span>{product.g_sale_time}</span>
        </div>
      </div>

      {cartPopupVisible && (
        <div id="cart-popup">
          <p>상품을 장바구니에 담았습니다.</p>
          <button className="shop" onClick={() => setCartPopupVisible(false)}>
            계속 쇼핑
          </button>
          <button className="shop" onClick={() => navigate('/cart')}>장바구니로 이동</button>
        </div>
      )}
    </div>
  );
};

export default GoodsDetailView;
