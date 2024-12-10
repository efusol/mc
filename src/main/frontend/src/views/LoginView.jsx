import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/member/LoginView.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { adminLogin, updateUser, userLogin } from '../store/member'

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mEmail, setMEmail] = useState('');
  const [mPw, setMPw] = useState('');

  useEffect(() => {
    const memberMessage = sessionStorage.getItem('message');
    const isLoginAttempt = sessionStorage.getItem('isLoginAttempt');

    if (memberMessage && isLoginAttempt) {
      alert(memberMessage);
      sessionStorage.removeItem('message');
      sessionStorage.removeItem('isLoginAttempt');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/member/loginConfirm`, {
      m_email: mEmail,
      m_pw: mPw,
    })
      .then((res) => {
        if (res.data.findMember) {
          sessionStorage.setItem('loginedMemberVo', JSON.stringify(res.data.findMember));
          sessionStorage.setItem('isAdmin', res.data.admin);
          alert("로그인 성공");
          dispatch(userLogin(res.data.findMember));
          dispatch(adminLogin(res.data.admin));
          navigate('/');
        } else {
          alert(res.data.message || '로그인 실패');
          navigate("/member/login")
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("다시 시도해주세요.");
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
        console.error("로그인 에러:", err);
      });
  };

  return (
    <div>
      <section id="login">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="m_email">이메일</label>
            <input type="email" id="m_email" name="m_email" value={mEmail}
              onChange={(e) => setMEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="m_pw">비밀번호</label>
            <input type="password" id="m_pw" name="m_pw" value={mPw}
              onChange={(e) => setMPw(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn">로그인</button>
        </form>
      </section>
    </div>
  );
};

export default LoginView;