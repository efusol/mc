import React from 'react';
import '../assets/css/news/NewsHappyView.css';
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/Banner';

const NewsHappyView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  return (
    <div>
      <Banner category={category} />
      <ul className="pro">
        <li>
          <a>
            <div>
              <img alt="" src="/assets/image/news/happy/pro16.png" />
            </div>
            <div className="text">
              <span>크록스! 귀여운 미니 크록스를 맥도날드 해피밀 토이로 만나보세요.</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NewsHappyView;
