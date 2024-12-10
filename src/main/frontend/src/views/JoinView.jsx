import React, { useState } from 'react';
import '../assets/css/member/JoinView.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinView = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    m_email: '',
    m_pw: '',
    m_name: '',
    m_year: '',
    m_month: '',
    m_day: '',
    m_hp: '',
    m_zipcode: '',
    m_address: '',
    m_address_sub: '',
  });

  const [m_pw_confirm, setM_pw_confirm] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleConfirmChange = (e) => {
    setM_pw_confirm(e.target.value);
  };

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setForm((prevForm) => ({
          ...prevForm,
          m_zipcode: data.zonecode,
          m_address: data.address,
        }));
        document.getElementById('m_address_sub').focus();
      },
    }).open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    for (const [key, value] of Object.entries(form)) {
      if (!value) {
        alert(`${key}를 입력해 주세요.`);
        document.getElementById(key).focus();
        return;
      }
    }

    if (form.m_pw !== m_pw_confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
  }

    axios.post(`${import.meta.env.VITE_API_URL}/member/joinConfirm`, form)
    .then((res)=>{
      alert("가입성공")
      navigate("/member/login")
    })
    .catch(err=>{
      if (err.response && err.response.status === 401) {
        alert("다시 시도해주세요.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
      console.error("회원가입 에러:", err);
    })
  };

  return (
    <section id="join">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="m_email">이메일</label>
          <input
            type="email"
            id="m_email"
            name="m_email"
            value={form.m_email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="m_pw">비밀번호</label>
          <input
            type="password"
            id="m_pw"
            name="m_pw"
            value={form.m_pw}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="m_pw">비밀번호 확인</label>
          <input
            type="password"
            id="m_pw_confirm"
            name="m_pw_confirm"
            value={m_pw_confirm}
            onChange={handleConfirmChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="m_name">이름</label>
          <input
            type="text"
            id="m_name"
            name="m_name"
            value={form.m_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>생년월일</label>
          <div className="date-group">
            <select
              id="m_year"
              name="m_year"
              value={form.m_year}
              onChange={handleInputChange}
              required
            >
              <option value="">년도</option>
              {[...Array(2025 - 1900)].map((_, i) => (
                <option key={i} value={1900 + i}>
                  {1900 + i}
                </option>
              ))}
            </select>
            <select
              id="m_month"
              name="m_month"
              value={form.m_month}
              onChange={handleInputChange}
              required
            >
              <option value="">월</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              id="m_day"
              name="m_day"
              value={form.m_day}
              onChange={handleInputChange}
              required
            >
              <option value="">일</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="m_hp">전화번호</label>
          <input
            type="text"
            id="m_hp"
            name="m_hp"
            value={form.m_hp}
            onChange={handleInputChange}
            required
            placeholder="010-1234-5678"
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={searchAddress}>
            우편번호
          </button>
          <input
            type="text"
            id="m_zipcode"
            name="m_zipcode"
            value={form.m_zipcode}
            readOnly
            style={{ width: '120px', display: 'inline-block', height: '40px' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="m_address">주소</label>
          <input
            type="text"
            id="m_address"
            name="m_address"
            value={form.m_address}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="m_address_sub">상세주소</label>
          <input
            type="text"
            id="m_address_sub"
            name="m_address_sub"
            value={form.m_address_sub}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="join-btn">
          가입하기
        </button>
      </form>
    </section>
  );
};

export default JoinView;
