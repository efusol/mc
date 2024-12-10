import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/Banner';
import '../assets/css/story/StoryBrandView.css';

const StoryBrandView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Banner category={category} />
      <div className="box">
        <ul>
          <li>
            <button
              className={activeTab === 0 ? 'active' : ''}
              onClick={() => handleTabClick(0)}
            >
              맥도날드 소개
            </button>
          </li>
          <li>
            <button
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => handleTabClick(1)}
            >
              맥도날드 철학 및 역사
            </button>
          </li>
        </ul>

        <div className={`section-content ${activeTab === 0 ? 'active' : ''}`}>
          <div className="intro1">
            <img alt="" src="/assets/image/story/brand/intro1.jpg" />
            <h1>세계 1위의 푸드서비스 기업, 맥도날드</h1>
            <p>
              전세계 120개국 3만 7천여 개의 매장에서 매일 6,900만명의 고객들에게
              제품과 서비스를 제공하고 있는 맥도날드는 전세계인들이 사랑하는
              퀵 서비스 레스토랑(QSR, Quick Service Restaurant)이자 세계 1위의
              푸드서비스 기업으로, 고객에게 더 나은 경험을 제공함으로써
              '고객이 가장 좋아하는 장소이자 음식을 즐기는 최고의 방법(Our
              Customer’s Favorite Place and Way to Eat)'이 되기 위해 노력하고
              있습니다.
            </p>
          </div>
          <div className="intro2">
            <h1>한국 맥도날드의 첫 걸음</h1>
            <ul>
              <li>
                <img alt="" src="/assets/image/story/brand/intro2.jpg" />
                <h2>
                  1988 서울 올림픽을 개최하며 서울이 세계 속에
                  <br />
                  우뚝 섰던 그때의 감동을 기억하십니까?
                </h2>
                <p>
                  159개국의 83,190명의 선수가 참가한 1988 서울 올림픽과 함께
                  맥도날드가 한국을 찾아왔습니다. 이후 맥도날드는 빅맥, 후렌치
                  후라이 그리고 해피밀과 같이 세계적으로 유명한 메뉴를 선보이며
                  한국 소비자들이 선호하는 즐거운 외식 공간으로 사랑을 받고
                  있습니다.
                </p>
              </li>
              <li>
                <img alt="" src="/assets/image/story/brand/intro3.jpg" />
                <h2>한국 첫 맥도날드 매장, 압구정점 그랜드 오프닝</h2>
                <p>
                  맥도날드는 가장 트렌디한 장소로 떠오르는 압구정동에 첫
                  레스토랑을 열었습니다. 수백 명의 고객들이 레스토랑 앞에 길게
                  줄을 늘어서며 맥도날드의 성공적인 시작을 함께 축하했고 이를
                  통해 맥도날드가 한국 시장에서 지속적으로 성장할 수 있다는
                  잠재력을 보여 주었습니다.
                </p>
              </li>
              <li>
                <img alt="" src="/assets/image/story/brand/intro4.jpg" />
                <h2>우리는 계속해서 나아갑니다.</h2>
                <p>
                  맥도날드는 지난 31년 동안 국내 협력 업체와 긴밀하게 일하고,
                  현재 15,000여명의 직원이 근무하는 등 한국 사회의 고용 창출에
                  기여하고 있습니다. 또한, 30여개 이상의 국내외 비즈니스를
                  지원해 왔습니다. 맥도날드는 좋은 품질의 제품을 합리적인 가격과
                  최상의 서비스 제공을 통해 고객이 가장 선호하는 장소로 거듭나기
                  위해 지속적으로 노력할 것입니다.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className={`section-content ${activeTab === 1 ? 'active' : ''}`}>
          <div className="history1">
            <img alt="" src="/assets/image/story/brand/history1.jpg" />
            <h1>
              맥도날드 기업철학의 뿌리,
              <br />
              창업주 레이 크록(Ray Kroc)의 이야기
            </h1>
            <h3>1954년, 맥도날드 형제가 만든 최고의 햄버거를 만나다</h3>
            <p>
              맥도날드 역사는 1954년 레이 크록(Ray Kroc)이 캘리포니아에 있는 한
              햄버거 가게를 방문하면서부터 시작되었습니다. 밀크 쉐이크 기계
              판매원으로 근무하던 크록은 맥도날드 형제가 운영하던 햄버거 가게에서
              주문을 받았고 그들에게 감탄했습니다. 메뉴는 간단하고 저렴하지만
              햄버거의 품질과 맛은 최고였습니다.
            </p>
          </div>
          <div className="history2">
            <div className="inner">
              <img alt="" src="/assets/image/story/brand/history2.jpg" />
              <div>
                <h3>1955년, 일리노이주에 첫 매장 오픈에서 5년 후,</h3>
                <p>
                  크록은 맥도날드 형제에게 미국 전역에 걸쳐 맥도날드 매장을
                  개장하는 비전을 제시하며 프랜차이즈 사업을 제안했습니다. 1955년에
                  크록은 일리노이주의 데스플레인스에 맥도날드의 첫 정식
                  프랜차이즈 매장을 오픈했습니다. 이후 큰 성공을 거두어 불과 5년
                  만에 점포 수는 200개가 되었습니다.
                </p>
                <h3>맥도날드의 기업철학의 뿌리, 레이 크록</h3>
                <p>
                  1984년 1월, 81세의 나이로 사망하기 직전까지 크록은 맥도날드를
                  위해 헌신했습니다. 그는 새 가맹점이 문을 열 때마다 영업 첫날의
                  판매 보고서를 받아 철저히 검토했으며, 맥도날드의 당시 신임
                  경영진이 어떻게 회사를 이끌어 가는지 늘 관심을 갖고
                  지켜보았습니다. 레이 크록의 진정한 공로는 수평적이고 모두의
                  성장을 꾀하는 새로운 사업구조와 그 시스템을 창조한 것입니다.
                </p>
              </div>
            </div>
            <div className="inner">
              <div>
                <h3>‘세 다리 의자(The Three-Legged Stool)’ 철학</h3>
                <p>
                  크록은 언제 어디에서나 변함없이 좋은 품질의 음식을 제공하고
                  완벽한 서비스를 동일하게 제공한다는 경영철학을 추구했습니다. 이를
                  위해 크록은 프랜차이즈 파트너와 공급 업체와의 수평적인 관계를 통해
                  동반 성장이 이루어져야 한다는 신념으로 이들에게 ‘맥도날드를 위해
                  일하는 것’이 아닌, ‘맥도날드와 함께 본인들을 위해 일하는 것’이라는
                  비전을 전달했습니다.
                </p>
              </div>
              <img alt="" src="/assets/image/story/brand/history3.jpg" />
            </div>
          </div>
          <div className="history3">
            <div className="first">
              <span>맥도날드의 네가지 약속</span>
            </div>
            <div className="second">
              <h3>
                품질, 서비스, 청결, 가치
                <br />
                <em>레이 크록</em>
              </h3>
              <p>
                레이 크록은 고객에게 깨끗한 레스토랑에서 품질 높은 식사를
                제공하겠다고 약속했습니다.
              </p>
            </div>
          </div>
          <ul className="history4">
            <li>
              <img alt="" src="/assets/image/story/brand/history4.jpg" />
              <h2>1988 서울 올림픽을 개최하며 서울이 세계 속에<br />우뚝 섰던 그때의 감동을 기억하십니까?</h2>
              <p>159개국의 83,190명의 선수가 참가한 1988 서울 올림픽과 함께 맥도날드가<br />
                한국을 찾아왔습니다. 이후 맥도날드는 빅맥, 후렌치 후라이 그리고 해피밀과 같이<br />
                세계적으로 유명한 메뉴를 선보이며 한국 소비자들이 선호하는 즐거운 외식 공간으로<br />
                사랑을 받고 있습니다.</p>
            </li>
            <li>
              <img alt="" src="/assets/image/story/brand/history5.jpg" />
              <h2>한국 첫 맥도날드 매장, 압구정점 그랜드 오프닝</h2>
              <p>맥도날드는 가장 트렌디한 장소로 떠오르는 압구정동에 첫 레스토랑을 열었습니다.<br />
                수백 명의 고객들이 레스토랑 앞에 길게 줄을 늘어서며 맥도날드의 성공적인 시작을<br />
                함께 축하했고 이를 통해 맥도날드가 한국 시장에서 지속적으로 성장할 수 있다는<br />
                잠재력을 보여 주었습니다.</p>
            </li>
            <li>
              <img alt="" src="/assets/image/story/brand/history6.jpg" />
              <h2>우리는 계속해서 나아갑니다.</h2>
              <p>맥도날드는 지난 31년 동안 국내 협력 업체와 긴밀하게 일하고, 현재 15,000여명의<br />
                직원이 근무하는 등 한국 사회의 고용 창출에 기여하고 있습니다. 또한, 30여개 이상의<br />
                국내외 비즈니스를 지원해 왔습니다. 맥도날드는 좋은 품질의 제품을 합리적인 가격과<br />
                최상의 서비스 제공을 통해 고객이 가장 선호하는 장소로 거듭나기 위해 지속적으로<br />
                노력할 것입니다.</p>
            </li>
            <li>
              <img alt="" src="/assets/image/story/brand/history7.jpg" />
              <h2>1988 서울 올림픽을 개최하며 서울이 세계 속에<br />우뚝 섰던 그때의 감동을 기억하십니까?</h2>
              <p>159개국의 83,190명의 선수가 참가한 1988 서울 올림픽과 함께 맥도날드가<br />
                한국을 찾아왔습니다. 이후 맥도날드는 빅맥, 후렌치 후라이 그리고 해피밀과 같이<br />
                세계적으로 유명한 메뉴를 선보이며 한국 소비자들이 선호하는 즐거운 외식 공간으로<br />
                사랑을 받고 있습니다.</p>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default StoryBrandView;
