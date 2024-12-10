import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios';
import '../../assets/css/mypage/OrderDetail.css';
import { useSelector } from 'react-redux';

const OrderDetail = () => {
  const { orderNo } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 상품 정보
  const [form, setForm] = useState({ rating: 0, comment: '', files: [] });
  const fileInputRef = useRef();
  const { user } = useSelector((state) => state.member);
  const navigate = useNavigate(); // useNavigate 선언

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/detail`, {
          params: { o_no: orderNo },
        });
        console.log(response.data);
        setOrderItems(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetail();
  }, [orderNo]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (form.files.length + selectedFiles.length > 3) {
      alert('사진은 최대 3장까지만 업로드할 수 있습니다.');
      return;
    }

    setForm((prev) => ({ ...prev, files: [...prev.files, ...selectedFiles] }));
  };

  const removeFile = (index) => {
    setForm((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles.splice(index, 1);
      return { ...prev, files: updatedFiles };
    });
  };

  const resetForm = () => {
    setForm({ rating: 0, comment: '', files: [] });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const registerReview = async () => {
    if (!form.rating || form.comment.length < 5) {
      alert('평점과 5자 이상의 리뷰를 입력하세요.');
      return;
    }

    if (form.files.length > 3) {
      alert('사진은 최대 3장까지만 업로드할 수 있습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('g_no', selectedItem.g_no);
    formData.append('o_d_no', selectedItem.o_d_no);
    formData.append('m_no', user.m_no);
    formData.append('rating', form.rating);
    formData.append('comment', form.comment);
    form.files.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/review/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { o_d_no, reviewed } = response.data;
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.o_d_no === o_d_no ? { ...item, reviewed } : item
        )
      );

      alert('리뷰가 등록되었습니다.');
      closeModal();
    } catch (error) {
      console.error('Error registering review:', error);
      alert('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  const goToReviewPage = (g_no) => {
    navigate(`/review/${g_no}`);
  };

  return (
    <div className="order-detail">
      <h1>주문 상품 목록</h1>
      <ul className="order-items">
        {orderItems.map((item) => (
          <li
            key={item.o_d_no}
            className="order-item"
            onClick={() => goToReviewPage(item.g_no)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/goods/image/${item.img_url}`}
              alt={item.g_name}
              className="order-item-image"
            />
            <div className="order-item-info">
              <p>상품명: {item.g_name}</p>
              <p>수량: {item.o_d_qty}</p>
              <p>가격: {item.g_price}원</p>
              <p>합계: {item.g_price * item.o_d_qty}원</p>
              {item.reviewed === 'Y' ? (
                <button
                  className="review-button completed"
                  disabled
                  onClick={(e) => e.stopPropagation()}
                >
                  리뷰 완료
                </button>
              ) : (
                <button
                  className="review-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(item);
                  }}
                >
                  리뷰 쓰기
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>리뷰 작성</h2>
            <div className="formBox">
              <form name="review_form">
                <table>
                  <colgroup>
                    <col style={{ width: '100px' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>상품명</td>
                      <td>{selectedItem.g_name}</td>
                    </tr>
                    <tr>
                      <td>평점</td>
                      <td className="star">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <label key={rating}>
                            <input
                              type="radio"
                              name="rating"
                              value={rating}
                              checked={Number(form.rating) === rating}
                              onChange={handleChange}
                            />{' '}
                            {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
                          </label>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>내용(필수)</td>
                      <td>
                        <textarea
                          name="comment"
                          style={{ width: '100%', height: '200px' }}
                          placeholder="5글자 이상 작성하세요!!"
                          value={form.comment}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>첨부사진</td>
                      <td className="attach">
                        <input
                          multiple
                          ref={fileInputRef}
                          type="file"
                          className="files"
                          onChange={handleFileChange}
                        />
                        {form.files.length > 0 && (
                          <div className="selected-files">
                            <p>선택된 파일:</p>
                            <ul>
                              {form.files.map((file, index) => (
                                <li key={index}>
                                  {file.name}{' '}
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    style={{
                                      marginLeft: '10px',
                                      background: 'transparent',
                                      border: 'none',
                                      color: '#f44336',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    삭제
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="modal-btn">
                  <button type="button" onClick={registerReview}>
                    등록
                  </button>
                  <button type="button" onClick={resetForm}>
                    취소
                  </button>
                  <button
                    type="button"
                    className="close"
                    onClick={closeModal}
                  >
                    닫기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
