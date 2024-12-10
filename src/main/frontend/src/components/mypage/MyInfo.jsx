import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { GiAchievement, GiHamburger, GiAbstract007 } from "react-icons/gi";
import axios from "axios";
import "../../assets/css/mypage/MyInfo.css";

const MyInfo = () => {
  const user = useSelector((state) => state.member.user);
  const [userState, setUserState] = useState(user);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    console.log("현재 Redux user 상태:", JSON.stringify(user));
    setUserState(user); 
  }, [user]);

  useEffect(() => {
    const fetchOrdersAndPoint = async () => {
      if (user?.m_no) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/order/total-orders-and-point`,
            { params: { m_no: user.m_no } }
          );
          console.log("주문 수와 포인트:", response.data);
          setOrderCount(response.data.totalOrders);
          setUserState((prevState) => ({
            ...prevState,
            point: response.data.point,
          }));
        } catch (error) {
          console.error("데이터 가져오기 실패:", error);
        }
      }
    };
  
    fetchOrdersAndPoint();
  }, [user?.m_no]);
  

  // user가 로딩 중인 경우 처리
  if (!user || Object.keys(user).length === 0) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="myinfo-container">
      <h1 className="myinfo-header">내 정보</h1>
      <div className="myinfo-details">
        <div className="myinfo-name">{user.m_name || "이름 없음"}</div>
        <div className="myinfo-point">
          포인트: <span>{userState.point || 0}</span>P
        </div>
      </div>
      <div className="myinfo-achievements">
        <div className="achievement-item">
          <GiAchievement className="icon" />
          <span>{orderCount >= 1 ? "첫걸음을 땐 자" : "미달성"}</span>
        </div>
        <div className="achievement-item">
          <GiHamburger className="icon" />
          <span>{orderCount >= 10 ? "당신은 맥도날드 매니아!" : "미달성"}</span>
        </div>
        <div className="achievement-item">
          <GiAbstract007 className="icon" />
          <span>{orderCount >= 20 ? "맥도날드 정복자" : "미달성"}</span>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
