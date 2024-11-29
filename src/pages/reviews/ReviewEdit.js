// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { callReviewDetailAPI, callReviewUpdateAPI } from '../../apis/ReviewAPICall';

// const ReviewEdit = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { reviewId } = useParams();
//     const reviewData = useSelector(state => state.reviewReducer.review);
//     const [review, setReview] = useState({ review: '', reviewRating: 1, reviewImage: null });
//     const [productId, setProductId] = useState(null);

//     useEffect(() => {
//         if (!reviewId) {
//             console.error('Review ID is undefined');
//             return;
//         }
//         dispatch(callReviewDetailAPI({ reviewId }));
//     }, [dispatch, reviewId]);

//     useEffect(() => {
//         if (reviewData) {
//             const { review, reviewRating, reviewImage, productId } = reviewData;
//             setReview({ review, reviewRating, reviewImage });
//             setProductId(productId);
//         }
//     }, [reviewData]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setReview({ ...review, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setReview({ ...review, reviewImage: file });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!reviewId || !productId) {
//             console.error('Review ID or Product ID is undefined');
//             return;
//         }
//         const reviewDTO = {
//             review: review.review,
//             reviewRating: review.reviewRating,
//             productId: productId
//         };
//         dispatch(callReviewUpdateAPI({ productId, reviewId, reviewDTO, reviewImage: review.reviewImage }))
//             .then(() => {
//                 alert('리뷰가 수정되었습니다.');
//                 navigate('/mypage/reviews/my-reviews');
//             })
//             .catch(error => console.error('리뷰 수정 중 오류 발생:', error));
//     };

//     return (
//         <div>
//             <h1>리뷰 수정 페이지</h1>
//             <form onSubmit={handleSubmit}>
//                 <textarea
//                     name="review"
//                     value={review.review}
//                     onChange={handleInputChange}
//                     placeholder="내용"
//                 />
//                 <input
//                     type="file"
//                     name="reviewImage"
//                     onChange={handleFileChange}
//                 />
//                 <select
//                     name="reviewRating"
//                     value={review.reviewRating}
//                     onChange={handleInputChange}
//                 >
//                     {[1, 2, 3, 4, 5].map(rating => (
//                         <option key={rating} value={rating}>{rating}</option>
//                     ))}
//                 </select>
//                 <button type="submit">수정 완료</button>
//             </form>
//         </div>
//     );
// };

// export default ReviewEdit; 