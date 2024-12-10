import React from 'react';
import '../assets/css/news/NewsPromotionView.css';
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/Banner';

const NewsPromotionView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  const promotions = [
    {
      imgSrc: '/assets/image/news/promotion/pro01.jpg',
      text: '맥런치 할인에 사이드 할인까지 맥런치 플러스 세트 출시!',
    },
    {
      imgSrc: '/assets/image/news/promotion/pro02.jpg',
      text: '탱글한 식감과 육즙 가득! 든든한 소시지 스낵랩',
    },
    {
      imgSrc: '/assets/image/news/promotion/pro15.jpg',
      text: '맥도날드 대표 간식을 1000원부터!',
    },
    {
      imgSrc: '/assets/image/news/promotion/pro03.jpg',
      text: '스리라차 마요로 오늘을 맛있게 쓰리라!',
    },
    {
      imgSrc: '/assets/image/news/promotion/pro05.jpg',
      text: '아침에 만나는 한국의 맛',
    },
  ];

  return (
    <div>
      <Banner category={category} />
      <ul className="pro">
        {promotions.map((item, index) => (
          <li key={index}>
            <a>
              <div>
                <img alt="" src={item.imgSrc} />
              </div>
              <div className="text">
                <span>{item.text}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPromotionView;
