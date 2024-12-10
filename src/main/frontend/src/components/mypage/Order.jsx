import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../assets/css/mypage/Order.css';

const Review = () => {
  const [orders, setOrders] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const { user } = useSelector((state) => state.member);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/list`, {
          params: { m_no: user.m_no, pageNum: currentPage, amount: itemsPerPage },
        });

        setOrders(response.data.orders);
        setPageInfo(response.data.pageInfo);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [user, currentPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // 서버에서 전달된 UTC 시간을 기반으로 Date 객체 생성

    // UTC 시간 추출
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`; // UTC 기준 시간 반환
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="order">
      <h1>주문내역</h1>
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.o_no}>
              {/* Link로 상세 페이지 이동 */}
              <Link to={`/mypage/order/${order.o_no}`}>
                <div className="inorder">
                  <h6>주문번호 : {order.o_id}</h6>
                  <p>받는이 : {order.o_name}</p>
                  <p>우편번호 : {order.o_zipcode}</p>
                  <p>가격 : {order.o_total_price}원</p>
                  <p>주소 : {order.o_address}</p>
                  <h6 style={{ marginTop: '20px' }}>주문일자 : {formatDate(order.o_reg_date)}</h6>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <h1>주문내역이 없습니다.</h1>
        )}
      </ul>
      <div className="pagination">
        {pageInfo.prev && (
          <button onClick={() => handlePageChange(pageInfo.startPage - 1)}>이전</button>
        )}
        {Array.from({ length: pageInfo.endPage - pageInfo.startPage + 1 }, (_, index) => (
          <button
            key={index + pageInfo.startPage}
            className={currentPage === index + pageInfo.startPage ? 'active' : ''}
            onClick={() => handlePageChange(index + pageInfo.startPage)}
          >
            {index + pageInfo.startPage}
          </button>
        ))}
        {pageInfo.next && (
          <button onClick={() => handlePageChange(pageInfo.endPage + 1)}>다음</button>
        )}
      </div>
    </div>
  );
};

export default Review;
