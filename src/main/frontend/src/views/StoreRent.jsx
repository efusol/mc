import React from 'react';
import Banner from '../components/common/Banner';
import { useLocation } from 'react-router-dom';
import '../assets/css/store/StoreRent.css';

const StoreRent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  return (
    <div>
      <Banner category={category} />
      <div className="box">
        <h1>토지 임대 및 매매</h1>
        <div className="depth top">
          <h3>임차조건</h3>
          <div>
            <p>안정적이고 지속적인 주거 인구 증가 지역</p>
            <p>차량의 진 출입 및 접근성이 좋은 위치</p>
            <p>도로변에 위치하여 가시성이 좋은 입지</p>
            <p>교통 통행량이 많은 지역</p>
          </div>
        </div>
        <div className="depth bottom">
          <h3>면적</h3>
          <div>
            <p>서울 - 최소 200평 이상 대지 면적</p>
            <p>경기도 및 광역시 - 최소 300평 이상 대지 면적</p>
            <p>그 외의 지역 - 최소 400평 이상 대지 면적</p>
          </div>
        </div>
      </div>
      <div className="box bottom">
        <h1>건물임대</h1>
        <div className="depth top">
          <h3>임차조건</h3>
          <div>
            <p>유동인구가 풍부한 지역 (역세권, 사무실 및 아파트 밀집 지역 등)</p>
            <p>서울/경기도 지역</p>
            <p>6대 광역시</p>
          </div>
        </div>
        <div className="depth bottom">
          <h3>면적</h3>
          <div>
            <p>전용으로 1층이 80평 이상의 면적 (20평은 창고, 휴게실 공간으로 지하/윗층으로 이동 될 수 있음)</p>
            <p>1,2층일 경우, 각 층이 40평 이상의 면적</p>
            <p>중심 상업지구라면 1층 40평 이하일 때, 2층은 60평 이상의 면적</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRent;
