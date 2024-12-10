import pytesseract
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageEnhance, ImageFilter
import os
import cv2
import numpy as np
import re
import requests

# Tesseract 실행 파일 경로 설정
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload_file():
    print("요청 받음")
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    m_no = request.form.get('m_no')  # 프론트에서 전달된 m_no
    if not m_no:
        return jsonify({"error": "회원 번호(m_no)가 없습니다."}), 400

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # 파일 저장
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        print(f"File saved to {filepath}")

        # OCR 처리
        extracted_text = perform_ocr(filepath)
        print("문자 추출 : ", extracted_text)

        # "아성다이소" 검증
        if "아성다이소" not in extracted_text:
            return jsonify({"error": "다이소 영수증이 아닙니다."}), 400

        # 데이터 추출
        receipt_id, total_amount, rc_point = extract_receipt_data(extracted_text)
        if not receipt_id or not total_amount:
            return jsonify({"error": "영수증 데이터 추출에 실패했습니다."}), 400

        # Java API 호출
        response = save_to_java(receipt_id, m_no, total_amount, rc_point)
        if response == True:
            return jsonify({"message": "영수증 처리 완료", "rc_no": receipt_id, "total_amount": total_amount, "rc_point": rc_point}), 200
        elif isinstance(response, dict) and response.get("status") == 409:
            return jsonify({"error": response["error"]}), 409
        else:
            return jsonify({"error": "Java API 호출 실패"}), 500

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "서버 처리 중 오류 발생"}), 500


def perform_ocr(image_path):
    preprocessed_image = preprocess_image(image_path)
    custom_config = r'--oem 3 --psm 6'

    try:
        # OCR 수행
        text = pytesseract.image_to_string(preprocessed_image, config=custom_config, lang="kor+eng")
        return text
    except pytesseract.TesseractError as e:
        print(f"Tesseract OCR failed: {e}")
        raise


def preprocess_image(image_path):
    image = Image.open(image_path)

    # 해상도 향상
    image = image.resize((image.width * 2, image.height * 2), Image.Resampling.LANCZOS)

    # 흑백 변환 및 대비 조정
    image = image.convert("L")
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2.0)

    # 필터 적용
    image = image.filter(ImageFilter.MedianFilter(size=3))

    # 임계값 처리
    image = np.array(image)
    _, thresholded = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
    return Image.fromarray(thresholded)


def extract_receipt_data(parse_text):
    try:
        # 날짜 및 영수증 ID 추출
        receipt_day = re.search(r'(\d{4})[-.](\d{2})[-.](\d{2}) (\d{2}):(\d{2})', parse_text)
        if not receipt_day:
            return None, None, None
        year, month, day, hour, minute = receipt_day.groups()
        receipt_id = f"{year}{month}{day}{hour}{minute}"

        # 판매합계 금액 추출
        total_amount_match = re.search(r'판매합계\s*([\d\s,]+)', parse_text)
        if not total_amount_match:
            print("판매합계 금액을 추출하지 못했습니다.")
            return None, None, None

        total_amount_raw = total_amount_match.group(1)
        total_amount_cleaned = total_amount_raw.replace(" ", "").replace(",", "")
        total_amount = int(total_amount_cleaned)

        # 적립 포인트 계산 (1% 적립)
        rc_point = int(total_amount * 0.01)

        return receipt_id, total_amount, rc_point
    except Exception as e:
        print(f"Error during receipt data extraction: {e}")
        return None, None, None


def save_to_java(receipt_id, m_no, total_amount, rc_point):
    java_api_url = "http://localhost:8080/receipt/upload"
    payload = {
        "rc_no": int(receipt_id),
        "m_no": int(m_no),
        "total_amount": int(total_amount),
        "rc_point": int(rc_point),
    }
    print(f"전송 데이터: {payload}")

    try:
        response = requests.post(java_api_url, json=payload, headers={"Content-Type": "application/json"})
        print(f"Java API Response: {response.status_code}, {response.text}")
        if response.status_code == 200:
            return True
        elif response.status_code == 409:
            return {"error": "중복된 영수증입니다.", "status": 409}
        else:
            return False
    except Exception as e:
        print(f"Java API 호출 에러: {e}")
        return False


if __name__ == '__main__':
    print("파이썬 서버 시작")
    app.run(host='0.0.0.0', port=5000, debug=True)
