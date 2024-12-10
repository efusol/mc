import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../assets/css/mypage/Receipt.css";

const Receipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef();
  const { user } = useSelector((state) => state.member) || {};

  useEffect(() => {
    if (user && user.m_no) {
      const fetchReceipts = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/receipt`,
            {
              params: { m_no: user.m_no },
            }
          );
          setReceipts(response.data);
        } catch (error) {
          console.error("영수증 데이터를 가져오는 중 오류 발생:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchReceipts();
    }
  }, [user]);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("파일이 선택되지 않았습니다.");
      return;
    }

    if (!user || !user.m_no) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("m_no", user.m_no);

    try {
      setUploadStatus("Python 서버에서 처리 중...");
      const pythonResponse = await axios.post(
        "http://192.168.10.171:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (pythonResponse.data.error) {
        alert(`오류 발생: ${pythonResponse.data.error}`);
        setUploadStatus("");
        return;
      }

      alert("영수증이 성공적으로 등록되었습니다.");
      setReceipts((prev) => [
        {
          rc_no: pythonResponse.data.rc_no,
          total_amount: pythonResponse.data.total_amount,
          rc_point: pythonResponse.data.rc_point,
          rc_reg_date: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (error) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.error || error.message;

      if (status === 409) {
        alert("이미 등록된 영수증입니다.");
      } else if (status === 400) {
        alert(errorMessage || "다이소 영수증이 아닙니다.");
      } else {
        alert("영수증 등록에 실패했습니다. 서버를 확인해주세요.");
      }
      setUploadStatus("");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="receipt-container">
      <h1>영수증 조회</h1>
      <div className="receipt-upload">
        <button className="upload-button" onClick={openFileDialog}>
          영수증 등록
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
      <ul className="receipt-list">
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <li key={receipt.rc_no} className="receipt-item">
              <p>영수증 번호: {receipt.rc_no}</p>
              <p>결제 금액: {receipt.total_amount}원</p>
              <p>적립 포인트: {receipt.rc_point}P</p>
              <p>등록일: {new Date(receipt.rc_reg_date).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>영수증 데이터가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default Receipt;
