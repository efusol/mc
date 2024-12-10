import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/css/mypage/UsedPoint.css";
import { useSelector } from "react-redux";

const UsedPoint = () => {
  const [usedPoints, setUsedPoints] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 6; // 페이지당 항목 수
  const { user } = useSelector((state) => state.member);

  useEffect(() => {
    const fetchUsedPoints = async () => {
      if (user?.m_no) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/order/used-points`,
            {
              params: { m_no: user.m_no, pageNum: currentPage, amount: itemsPerPage },
            }
          );
          setUsedPoints(response.data.usedPoints); // 사용 내역
          setPageInfo(response.data.pageInfo); // 페이지 정보
        } catch (error) {
          console.error("포인트 사용 내역을 가져오는 중 오류 발생:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUsedPoints();
  }, [user, currentPage]); // currentPage 변경 시 다시 요청

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 번호 변경
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="used-point-container">
      <h1 className="used-point-header">포인트 사용 내역</h1>
      {usedPoints.length > 0 ? (
        <>
          <ul className="used-point-list">
            {usedPoints.map((point, index) => (
              <li key={index} className="used-point-item">
                <Link to={`/mypage/order/${point.o_no}`} className="used-point-link">
                  <span className="used-point-date">
                    {new Date(point.o_reg_date).toLocaleDateString()}{" "}
                    {new Date(point.o_reg_date).toLocaleTimeString()}
                  </span>
                  <span className="used-point-id">
                    주문번호: {point.o_id}
                  </span>
                  <span className="used-point-amount">
                    사용 포인트: {point.used_points}P
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {/* 페이지네이션 */}
          <div className="pagination">
            {pageInfo.prev && (
              <button onClick={() => handlePageChange(pageInfo.startPage - 1)}>
                이전
              </button>
            )}
            {Array.from(
              { length: pageInfo.endPage - pageInfo.startPage + 1 },
              (_, index) => (
                <button
                  key={index + pageInfo.startPage}
                  className={
                    currentPage === index + pageInfo.startPage ? "active" : ""
                  }
                  onClick={() => handlePageChange(index + pageInfo.startPage)}
                >
                  {index + pageInfo.startPage}
                </button>
              )
            )}
            {pageInfo.next && (
              <button onClick={() => handlePageChange(pageInfo.endPage + 1)}>
                다음
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="no-used-points">포인트 사용 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default UsedPoint;
