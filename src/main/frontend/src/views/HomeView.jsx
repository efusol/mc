import React from 'react';
import Slider from 'react-slick';
import '../assets/css/home/HomeView.css';
import 'slick-carousel/slick/slick.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HomeView = () => {
    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className="prev-arrow-wrapper" onClick={onClick}>
                <IoIosArrowBack className={className} />
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className="next-arrow-wrapper" onClick={onClick}>
                <IoIosArrowForward className={className} />
            </div>
        );
    };

    const options = {
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    return (
        <div>
            <div className="slider">
                <Slider {...options}>
                    {Array.from({ length: 9 }, (_, index) => (
                        <div key={index}>
                            <img alt="" src={`../assets/image/home/${index + 1}.jpg`} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="promotion">
                <h2>McDonald's LIVE</h2>
                <ul className="pro">
                    {[
                        { img: "../assets/image/home/pro01.jpg", text: "맥크리스피 스리라차 마요 & 베토디 스리라차 마요 출시!" },
                        { img: "../assets/image/home/pro02.jpg", text: "아침에 만나는 한국의 맛" },
                        { img: "../assets/image/home/pro03.jpg", text: "겉은 바삭! 속은 쫄깃 여름엔 역시 맥윙!" },
                        { img: "../assets/image/home/pro04.jpg", text: "가성비 간식 맛집 맥도날드 해피스낵!" },
                        { img: "../assets/image/home/pro05.jpg", text: "신선한 토마토와 고소한 치즈버거의 조화! 토마토 치즈 비프 버거 출시!" },
                        { img: "../assets/image/home/pro06.jpg", text: "빠삭하게 빠져드는 맛, 맥크리스피!" },
                        { img: "../assets/image/home/pro07.jpg", text: "갓 구워내 따뜻하고 신선한 베이컨 토마토 에그 머핀!" },
                        { img: "../assets/image/home/pro08.jpg", text: "맥도날드와 함께 성장할 크루와 매니저를 찾습니다" },
                        { img: "../assets/image/home/pro09.png", text: "우리가 엄격해질수록 버거는 더 맛있어지니까!" },
                        { img: "../assets/image/home/pro10.jpg", text: "0.1초에 1잔! 매일 마시는 커피를 더 맛있게" },
                        { img: "../assets/image/home/pro11.jpg", text: "전문 코치들의 체계적이고 전문적인 교육을 통해 지역사회 행복에 기여합니다" },
                        { img: "../assets/image/home/pro12.png", text: "귀하의 토지,건물에 맥도날드를 유치 하세요!" },
                    ].map((promo, index) => (
                        <li key={index}>
                            <a>
                                <div>
                                    <img alt="" src={promo.img} />
                                </div>
                                <div className="text">
                                    <span>{promo.text}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomeView;
