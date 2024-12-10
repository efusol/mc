import React, { useEffect } from 'react';
import Banner from '../components/common/Banner';
import { useLocation } from 'react-router-dom';
import '../assets/css/store/StoreMap.css'

const StoreMap = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  useEffect(() => {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.498641632710324, 127.02872707037953),
        level: 3
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(37.498641632710324, 127.02872707037953);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }, [])


  return (
    <div>
      <Banner category={category} />
      <div id="map" style={{ width: '1200px', height: '600px', margin: 'auto', marginTop: '120px' }}></div>

      <div className="store">
        <p className="abc">
          *영업시간은 매장 사정에 따라 변경 될 수 있습니다
        </p>
        <table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>매장명 / 주소</th>
              <th>전화번호</th>
              <th>영업시간</th>
              <th>이용가능 서비스</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>강남 2호점</h4>
                <p>서울 강남구 역삼동 822-2</p>
                <p>서울 강남구 테헤란로 107 메디타워2층</p>
              </td>
              <td className="cont"><p>02-6205-6400</p></td>
              <td className="cont">
                <p>08:00~24:00</p>
                <p>8/14~8/19 임시휴업</p>
              </td>
              <td>
                <div className="service">
                  <span>
                    <img alt="" src="../assets/image/store/delivery.png" />
                    맥딜리버리
                  </span>
                  <span>
                    <img alt="" src="../assets/image/store/decaffein.png" />
                    디카페인 커피
                  </span>
                  <span>
                    <img alt="" src="../assets/image/store/morning.png" />
                    맥모닝
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreMap;