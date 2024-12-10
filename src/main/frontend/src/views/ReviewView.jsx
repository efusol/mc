import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/css/review/ReviewView.css';

const ReviewView = () => {
  const { g_no } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [filterPhotosOnly, setFilterPhotosOnly] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/goods/detail/${g_no}`);
        setProduct(response.data);
      } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/review/goods/${g_no}`);
        const modifiedReviews = response.data.map((review) => ({
          ...review,
          maskedName: maskName(review.memberName),
        }));
        setReviews(modifiedReviews);
      } catch (error) {
        console.error('리뷰 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [g_no]);

  const maskName = (name) => {
    if (!name) return '';
    return name.charAt(0) + '**';
  };

  const filteredReviews = filterPhotosOnly
    ? reviews.filter((review) => review.photos && review.photos.length > 0)
    : reviews;

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (average) => {
    const filledStars = Math.floor(average);
    const partialFill = average % 1;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<div key={i} className="review-star full"></div>);
      } else if (i === filledStars && partialFill > 0) {
        stars.push(
          <div
            key={i}
            className="review-star partial"
            style={{ '--partial-fill': `${partialFill * 100}%` }}
          ></div>
        );
      } else {
        stars.push(<div key={i} className="review-star empty"></div>);
      }
    }

    return <div className="review-star-container">{stars}</div>;
  };

  const renderPhotos = (photos) => {
    const baseUrl = `${import.meta.env.VITE_API_URL}/review/image/`;
    if (!photos || photos.length === 0) return null;

    return (
      <div className="review-photos">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`${baseUrl}${photo}`}
            alt={`리뷰 사진 ${index + 1}`}
            className="review-clickable-photo"
            onClick={() => setModalPhoto(`${baseUrl}${photo}`)}
          />
        ))}
      </div>
    );
  };

  const loadMoreReviews = () => {
    setVisibleCount((prevCount) => prevCount + 1); // 10개씩 더 로드
  };

  return (
    <div className="review-container">
      {product && (
        <div className="review-product-info">
          <img
            src={`${import.meta.env.VITE_API_URL}/goods/image/${product.img_url}`}
            alt={product.g_name}
            className="review-product-image"
          />
          <div className="review-product-details">
            <h2>{product.g_name}</h2>
            <h3>{product.g_english_name}</h3>
            <div className="review-product-rating">
              별점 {renderStars(calculateAverageRating())} {calculateAverageRating()} / 5
            </div>
            <div className="review-product-review-count">리뷰 {reviews.length}건</div>
            <p className="review-product-description">{product.g_content}</p>
          </div>
        </div>
      )}

      <div className="review-section">
        <div className="review-header">
          <span>사진 리뷰만</span>
          <label className="review-switch">
            <input
              type="checkbox"
              checked={filterPhotosOnly}
              onChange={() => setFilterPhotosOnly((prev) => !prev)}
            />
            <span className="review-slider"></span>
          </label>
        </div>

        <ul className="review-list">
          {filteredReviews.slice(0, visibleCount).map((review) => (
            <li key={review.reviewNo} className="review-item">
              <div className="review-top">
                <div className="review-author">{review.maskedName}</div>
                <div className="review-rating">
                  {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <div className="review-body">
                {review.photos && renderPhotos(review.photos)}
                <div className="review-comment">{review.comment}</div>
              </div>
              <div className="review-date">
                {new Date(review.reviewRegDate).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>

        {visibleCount < filteredReviews.length && (
          <button className="review-load-more" onClick={loadMoreReviews}>
            +
          </button>
        )}
      </div>

      {modalPhoto && (
        <div className="review-modal" onClick={() => setModalPhoto(null)}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="review-close-button" onClick={() => setModalPhoto(null)}>
              &times;
            </button>
            <img src={modalPhoto} alt="원본 이미지" className="review-original-photo" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewView;
