import React from 'react';
import '../../assets/css/common/Footer.css';

function Footer() {
  return (
    <footer>
      <section id="footer">
        <ul className="util">
          <li className="first"><a href="#">개인정보 처리방침</a></li>
          <li><a href="#">위치정보 이용약관</a></li>
          <li><a href="#">사이트맵</a></li>
          <li><a href="#">임차문의</a></li>
          <li><a href="#">고객문의</a></li>
          <li><a href="#">인재채용</a></li>
        </ul>
        <ul className="info">
          <li>한국맥도날드(유)</li>
          <li>대표이사: 김기원</li>
          <li>사업자등록번호: 101-81-26409</li>
          <li>전화주문: 1600-5252</li>
          <li>COPYRIGHT © 2019 ALL RIGHTS RESERVED BY McDonald's.</li>
        </ul>
        <ul className="sns">
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li className="im"><a href="#"><img src="/assets/image/common/web_accessibility.png" alt="웹 접근성 로고" /></a></li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
