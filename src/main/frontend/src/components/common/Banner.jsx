import React from 'react';

const Banner = ({ category }) => {
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
      case 'storemap':
        return (
          <>
            <h1 style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>매장찾기</h1>
          </>
        );
      case 'store':
        return (
          <>
            <h1 style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>임차문의</h1>
          </>
        );
      case 'pronews':
        return (
          <>
            <h1 style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>맥도날드 프로모션</h1>
          </>
        );
      case 'news':
        return (
          <>
            <h1 style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>새로운 소식</h1>
          </>
        );
      case 'happynews':
        return (
          <>
            <h1 style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>이달의 해피밀</h1>
          </>
        );
      case 'story':
        return (
          <>
            <h1 style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>Story</h1>
          </>
        );
      case 'brand':
        return (
          <>
            <h1>브랜드 소개</h1>
            <p>1955년 작은 레스토랑에서부터 지금에 이르기까지 고객이 가장 좋아하는 장소이자,</p>
            <p>음식을 즐기는 최고의 방법이 되기 위해 맥도날드는 오늘도 노력합니다.</p>
          </>
        );
      case 'social':
        return (
          <>
            <h1>사회적 책임과 지원</h1>
            <p>맥도날드는 건전한 기업시민으로서의 책임을 다하고자 노력합니다.</p>
            <p>지역 사회의 발전과 사람들의 행복에 기여하고, 지금보다 더 나은 세상을 만들기 위해 오늘도 나아갑니다.</p>
          </>
        );
      case 'quality':
        return (
          <>
            <h1>맥도날드 품질 이야기</h1>
            <p>우리가 엄격해질수록 버거는 더 맛있어지니까!</p>
            <p>모두의 노력으로 엄격하고 꼼꼼하게 키워진 신선한 식재료가 모여, 마침내 맛있는 맥도날드 버거가 됩니다.</p>
          </>
        );
      case 'people':
        return (
          <>
            <h1>맥도날드 사람들</h1>
            <p>끊임없는 변화와 도전을 통해 성장해온 맥도날드</p>
            <p>이 변화의 중심에는 맥도날드와 함께 변화하며 성장하는 ‘맥도날드 사람들’이 있습니다.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="background-container" style={{ backgroundImage: `url('../../assets/image/banner/${category}.jpg')` }}>
      <div className="category_content" style={{ position: 'relative' }}>
        {renderCategoryContent()}
      </div>
    </div>
  );
};

export default Banner;
