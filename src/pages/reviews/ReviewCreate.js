// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { callReviewWriteAPI } from '../../apis/ReviewAPICall';

// const ReviewCreate = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { productId } = useParams(); // URL 경로에서 productId 추출

//     // Form 상태 초기화
//     const [form, setForm] = useState({
//         review: '',
//         reviewRating: 1,
//         reviewImage: null,
//     });

//     // 폼 필드 변경 핸들러
//     const onChangeHandler = (e) => {
//         const { name, value, files } = e.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     // 폼 제출 핸들러
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { review, reviewRating, reviewImage } = form;

//         // 유효성 검사
//         if (!review.trim()) {
//             alert('리뷰 내용을 입력해주세요.');
//             return;
//         }

//         try {
//             const reviewDTO = { review, reviewRating };

//             console.log("productId:", productId);
//             console.log("reviewDTO:", reviewDTO);
//             console.log("reviewImage:", reviewImage);

//             // API 호출
//             await dispatch(callReviewWriteAPI({ productId, reviewDTO, reviewImage }));

//             alert('리뷰가 등록되었습니다.');
//             navigate('/mypage/reviews/my-reviews'); // 등록 후 사용자 리뷰 목록으로 이동
//         } catch (error) {
//             console.error('리뷰 등록 중 오류 발생:', error);
//             alert('리뷰 등록에 실패했습니다. 오류: ' + error.message); // 오류 메시지 표시
//         }
//     };

//     return (
//         <div>
//             <h1>리뷰 작성</h1>
//             <form onSubmit={handleSubmit}>
//                 {/* 리뷰 내용 입력 */}
//                 <textarea
//                     name="review"
//                     value={form.review}
//                     onChange={onChangeHandler}
//                     placeholder="후기 내용을 입력하세요"
//                     required
//                 />

//                 {/* 이미지 업로드 */}
//                 <input
//                     type="file"
//                     name="reviewImage"
//                     accept="image/*" // 이미지 파일만 허용
//                     onChange={onChangeHandler}
//                 />

//                 {/* 평점 선택 */}
//                 <select
//                     name="reviewRating"
//                     value={form.reviewRating}
//                     onChange={onChangeHandler}
//                     required
//                 >
//                     {[1, 2, 3, 4, 5].map((rating) => (
//                         <option key={rating} value={rating}>
//                             {rating}
//                         </option>
//                     ))}
//                 </select>

//                 <button type="submit">등록</button>
//             </form>
//         </div>
//     );
// };

// export default ReviewCreate;
