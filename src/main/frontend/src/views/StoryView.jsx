import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Banner from '../components/common/Banner';
import '../assets/css/story/StoryView.css';

const StoryView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  const stories = [
    {
      id: 'brand',
      imgSrc: '/assets/image/story/story1.jpg',
      title: '01. 브랜드소개',
      subtitle: '1955년부터 지금까지 이어져온 맥도날드의 발자취',
      description:
        '1955년 작은 레스토랑에서부터 지금에 이르기까지 고객이 가장 좋아하는 장소이자, 음식을 즐기는 최고의 방법이 되기 위해 맥도날드는 오늘도 노력합니다.',
      link: '/storyBrand?category=brand',
    },
    {
      id: 'social',
      imgSrc: '/assets/image/story/story2.jpg',
      title: '02. 맥도날드의 사회적 책임',
      subtitle: '더 나은 세상을 위한 맥도날드의 노력',
      description:
        '맥도날드는 건전한 기업시민으로서의 책임을 다하고자 노력합니다. 지역 사회의 발전과 사람들의 행복에 기여하고 지금보다 더 나은 세상을 만들기 위해 오늘도 나아갑니다.',
      link: '/storySocial?category=social',
    },
    {
      id: 'quality',
      imgSrc: '/assets/image/story/story3.jpg',
      title: '03. 맥도날드 경쟁력',
      subtitle: '식재료부터 레스토랑까지 엄격한 기준을 고집합니다.',
      description:
        '맥도날드는 어떤 곳 보다 햄버거 비즈니스를 진지하게 생각합니다. 엄격한 품질 관리 시스템을 통해 고품질의 음식을 제공하며, 조리 과정에서 고객이 궁금한 모든 것을 알려드립니다.',
      link: '/storyQuality?category=quality',
    },
    {
      id: 'people',
      imgSrc: '/assets/image/story/story4.jpg',
      title: '04. 맥도날드 사람들',
      subtitle: '최초의 서비스에 담긴 자부심으로 맥도날드의 새로운 변화를 이끌어갑니다.',
      description:
        '끊임없는 변화와 도전을 통해 성장해온 맥도날드. 이 변화의 중심에는 맥도날드와 함께 변화하며 성장하는 "맥도날드 사람들"이 있습니다.',
      link: '/storyPeople?category=people',
    },
  ];

  return (
    <div>
      <Banner category={category} />
      <div className="box">
        <h2>세계 1위의 푸드서비스 기업, 맥도날드</h2>
        <p>
          전 세계 119개국 3만 4천여 개의 매장에서, 약 170만 명의 직원들이 근무하며<br />
          매일 6,900만 명의 고객들에게 제품과 서비스를 제공하고 있는 맥도날드는<br />
          전세계인들이 사랑하는 퀵 서비스 레스토랑(QSR, Quick Service Restaurant)이자<br />
          세계 1위의 푸드서비스 기업으로, 고객에게 더 나은 경험을 제공함으로써<br />
          ‘고객이 가장 좋아하는 장소이자 음식을 즐기는 최고의 방법(Our Customer’s<br />
          Favorite Place and Way to Eat)’이 되기 위해 노력하고 있습니다.
        </p>
        {stories.map((story, index) => (
          <div key={story.id} className={`img ${index % 2 === 0 ? 'left' : 'right'}`}>
            {index % 2 === 0 && <img alt="" src={story.imgSrc} />}
            <div>
              <h1>{story.title}</h1>
              <h3>{story.subtitle}</h3>
              <p>{story.description}</p>
              <Link to={story.link}>자세히 보기</Link>
            </div>
            {index % 2 !== 0 && <img alt="" src={story.imgSrc} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryView;
