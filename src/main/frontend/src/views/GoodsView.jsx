import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/goods/GoodsView.css'
import { useSelector } from 'react-redux';

const GoodsView = () => {
  const [goodsList, setGoodsList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const [filteredGoods, setFilteredGoods] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const { admin } = useSelector((state) => state.member);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/goods/goodsList`, null, { params: { category } });
        setGoodsList(response.data);
        setFilteredGoods(response.data);
        setVisibleCount(response.data.length);
        setActiveButton(getDefaultButtonType());
      } catch (error) {
        console.error('Error fetching goods:', error);
      }
    };

    fetchGoods();
  }, [category]);

  const getDefaultButtonType = () => {
    switch (category) {
      case 'burger':
      case 'mcmorning':
        return 'single';
      case 'mclunch':
        return 'mclunch';
      case 'happysnack':
        return 'happysnack';
      case 'sidedessert':
        return 'side';
      case 'mccafedrink':
        return 'cafe';
      default:
        return 'all';
    }
  };

  const filterProducts = (type) => {
    setActiveButton(type);
    const filtered = type === 'all' ? goodsList : goodsList.filter(product => product.g_type === type);
    setFilteredGoods(filtered);
    setVisibleCount(filtered.length);
  };

  const renderCategoryButtons = () => {
    switch (category) {
      case 'burger':
      case 'mcmorning':
        return (
          <>
            <button
              onClick={() => filterProducts('single')}
              className={`category-button ${activeButton === 'single' ? 'active' : ''}`}
            >
              단품메뉴
            </button>
            <button
              onClick={() => filterProducts('set')}
              className={`category-button ${activeButton === 'set' ? 'active' : ''}`}
            >
              세트메뉴
            </button>
          </>
        );
      case 'mclunch':
        return (
          <button
            onClick={() => filterProducts('mclunch')}
            className={`category-button ${activeButton === 'mclunch' ? 'active' : ''}`}
          >
            맥런치 세트
          </button>
        );
      case 'happysnack':
        return (
          <button
            onClick={() => filterProducts('happysnack')}
            className={`category-button ${activeButton === 'happysnack' ? 'active' : ''}`}
          >
            해피 스낵
          </button>
        );
      case 'sidedessert':
        return (
          <>
            <button
              onClick={() => filterProducts('side')}
              className={`category-button ${activeButton === 'side' ? 'active' : ''}`}
            >
              사이드
            </button>
            <button
              onClick={() => filterProducts('dessert')}
              className={`category-button ${activeButton === 'dessert' ? 'active' : ''}`}
            >
              디저트
            </button>
          </>
        );
      case 'mccafedrink':
        return (
          <>
            <button
              onClick={() => filterProducts('cafe')}
              className={`category-button ${activeButton === 'cafe' ? 'active' : ''}`}
            >
              맥카페
            </button>
            <button
              onClick={() => filterProducts('drink')}
              className={`category-button ${activeButton === 'drink' ? 'active' : ''}`}
            >
              음료
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const renderCategoryContent = () => {
    switch (category) {
      case 'burger':
        return (
          <>
            <h1>버거</h1>
            <p>빅맥®에서 맥스파이시® 상하이버거까지,</p>
            <p>주문 즉시 바로 조리해 더욱 맛있는, 맥도날드의 다양한 버거를 소개합니다.</p>
          </>
        );
      case 'mclunch':
        return (
          <>
            <h1>맥런치</h1>
            <p>오전 10시 30분부터 오후 2시까지</p>
            <p>점심만의 특별한 할인으로 맥런치 세트를 즐겨보세요!</p>
          </>
        );
      case 'mcmorning':
        return (
          <>
            <h1>맥모닝</h1>
            <p>새벽 4시부터 오전 10시 30분까지</p>
            <p>갓 구워내 신선한 맥모닝으로 따뜻한 아침 식사를 챙겨 드세요!</p>
          </>
        );
      case 'happysnack':
        return (
          <>
            <h1>해피 스낵</h1>
            <p>시즌 별 인기 스낵을 하루종일</p>
            <p>할인 가격으로 만나보세요!</p>
          </>
        );
      case 'sidedessert':
        return (
          <>
            <h1>사이드 & 디저트</h1>
            <p>가볍게 즐겨도, 버거와 함께 푸짐하게 즐겨도,</p>
            <p>언제나 맛있는 사이드와 디저트 메뉴!</p>
          </>
        );
      case 'mccafedrink':
        return (
          <>
            <h1 style={{ marginBottom: '72px' }}>맥카페 & 음료</h1>
            <p>언제나 즐겁게, 맥카페와 다양한 음료를 부담없이 즐기세요!</p>
          </>
        );
      default:
        return null;
    }
  };

  const removeGoods = async (gNo) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/goods/deleteGoods`, {
        params: { g_no: gNo },
      });
      alert("삭제되었습니다.")
      setFilteredGoods(preGoods => {
        const updatedGoods = preGoods.filter(item => item.g_no != gNo);
        return updatedGoods;
      })
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div>
      <div className="background-container" style={{ backgroundImage: `url('../assets/image/banner/${category}.jpg')` }}>
        <div className="category_content">
          {renderCategoryContent()}
        </div>
      </div>

      <div className="category-type-container">
        {renderCategoryButtons()}
      </div>

      <p className="product-count">
        <span id="visible-product-count">{visibleCount}</span> products
      </p>

      <ul className="goods">
        {filteredGoods.map((product) => (
          <li key={product.g_no} data-type={product.g_type}>
            <Link className="goodsd" to={`/goodsdetail/${product.g_no}`}>
              <div>
                <img src={`${import.meta.env.VITE_API_URL}/goods/image/${product.img_url}`} alt={product.g_name} />
              </div>
              <div className="goods_content">
                <h3>{product.g_name}</h3>
                <p>{product.g_english_name}</p>
                <p>가격: {product.g_price.toLocaleString()}원</p>
              </div>
            </Link>
            {admin && (
              <div className='goods-admin'>
                <Link className="modify" to={`/goodsModify?g_no=${product.g_no}`}>수정</Link>
                <Link className="delete" onClick={() => removeGoods(product.g_no)}>삭제</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoodsView;
