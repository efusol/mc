import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/mypage/UserModify.css';
import { useSelector } from 'react-redux';

const UserModify = () => {
  const { user } = useSelector((state) => state.member);

  const [userInfo, setUserInfo] = useState({
    m_no: user?.m_no || '',
    m_email: user?.m_email || '',
    m_pw: '',
    new_m_pw: '',
    new_m_pwcheck: '',
    m_name: user?.m_name || '',
    m_year: user?.m_year || '',
    m_month: user?.m_month || '',
    m_day: user?.m_day || '',
    m_hp: user?.m_hp || '',
    m_zipcode: user?.m_zipcode || '',
    m_address: user?.m_address || '',
    m_address_sub: user?.m_address_sub || '',
  });

  useEffect(() => {
    if (user && user.m_no) {
      async function fetchUserInfo() {
        try {
          const userData = await axios.get(`${import.meta.env.VITE_API_URL}/member/memberInfo`, {
            params: { m_no: user.m_no },
          });
          const { m_pw, ...restUserInfo } = userData.data;
          setUserInfo({ ...restUserInfo, m_pw: ''});
          
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      fetchUserInfo();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          m_zipcode: data.zonecode,
          m_address: data.address,
        }));
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedUserInfo = {
      ...userInfo,
      new_m_pw: userInfo.new_m_pw || '',
      new_m_pwcheck: userInfo.new_m_pwcheck || '',
    };

    console.log('전송할 데이터:', updatedUserInfo);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/member/updateInfo`,
        updatedUserInfo
      );
      alert('정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      if (error.response) {
        // 백엔드에서 받은 응답 객체를 콘솔에 출력
        console.error('Response error:', error.response);
  
        // HTTP 응답 상태 코드에 따라 다른 메시지 표시
        const { status, data } = error.response;
  
        // 상태 코드와 데이터에 맞게 오류 메시지를 사용자에게 전달
        if (status === 400 || status === 403 || status === 404) {
          alert(`${data}`);
        } else {
          alert('정보 수정 중 예상치 못한 오류가 발생했습니다.');
        }
      } else {
        // 응답 객체가 없는 경우 일반 오류 메시지 표시
        console.error('정보 수정 중 오류 발생:', error);
        alert('정보 수정 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <section id="edit">
      <h1>정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="m_no" value={userInfo.m_no} />
        <div className="form-group">
          <label htmlFor="m_email">이메일</label>
          <input type="email" id="m_email" name="m_email" value={userInfo.m_email} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="m_pw">비밀번호</label>
          <input
            type="password"
            id="m_pw"
            name="m_pw"
            value={userInfo.m_pw}
            placeholder="현재 비밀번호를 입력하세요"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new_m_pw">새 비밀번호</label>
          <input
            type="password"
            id="new_m_pw"
            name="new_m_pw"
            value={userInfo.new_m_pw}
            placeholder="새 비밀번호를 입력하세요 (선택 사항)"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new_m_pwcheck">새 비밀번호 확인</label>
          <input
            type="password"
            id="new_m_pwcheck"
            name="new_m_pwcheck"
            value={userInfo.new_m_pwcheck}
            placeholder="새 비밀번호를 다시 입력하세요 (선택 사항)"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="m_name">이름</label>
          <input type="text" id="m_name" name="m_name" value={userInfo.m_name} readOnly />
        </div>
        <div className="form-group">
          <label>생년월일</label>
          <div className="date-group">
            <select id="m_year" name="m_year" value={userInfo.m_year} readOnly disabled>
              {[...Array(2025 - 1900 + 1).keys()].map((i) => (
                <option key={i} value={1900 + i}>{1900 + i}</option>
              ))}
            </select>
            <select id="m_month" name="m_month" value={userInfo.m_month} readOnly disabled>
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select id="m_day" name="m_day" value={userInfo.m_day} readOnly disabled>
              {[...Array(31).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="m_hp">전화번호</label>
          <input type="text" id="m_hp" name="m_hp" value={userInfo.m_hp} readOnly />
        </div>
        <div className="form-group">
          <button type="button" onClick={searchAddress}>우편번호</button>
          <input type="text" id="m_zipcode" name="m_zipcode" value={userInfo.m_zipcode} readOnly style={{ width: '120px', display: 'inline-block' }} />
        </div>
        <div className="form-group">
          <label htmlFor="m_address">주소</label>
          <input type="text" id="m_address" name="m_address" value={userInfo.m_address} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="m_address_sub">상세주소</label>
          <input type="text" id="m_address_sub" name="m_address_sub" value={userInfo.m_address_sub} required onChange={handleChange} />
        </div>
        <button type="submit" className="btn">수정하기</button>
      </form>
    </section>
  );
};

export default UserModify;
