// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { callReviewDetailAPI, callReviewDeleteAPI } from '../../apis/ReviewAPICall';
// import { useNavigate, useParams } from 'react-router-dom';

// const ReviewDetail = () => {
//     const { productId, reviewId } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const data = useSelector(state => state.reviewReducer || {});
//     const review = data.review || {};
//     const reviewImage = data.reviewImage || {};
//     // const reviewRating = data.reviewRating || {};
//     // const productId = data.productId || {};

//     console.log("review ======== ", review);

//     useEffect(() => {
//         dispatch(callReviewDetailAPI({ reviewId }));
//     }, [dispatch, reviewId]);

//     const handleEdit = () => {
//         navigate(`/mypage/reviews/edit/${productId}/${reviewId}`);
//     };

//     const handleDelete = () => {
//         if (window.confirm('정말 삭제하시겠습니까?')) {
//             dispatch(callReviewDeleteAPI({ productId, reviewId }))
//                 .then(() => {
//                     alert('리뷰가 삭제되었습니다.');
//                     navigate('/mypage/reviews/my-reviews');
//                 })
//                 .catch(error => console.error('리뷰 삭제 중 오류 발생:', error));
//         }
//     };

//     return (
//         <div>
//             <h1>리뷰 상세페이지</h1>
            
//                 <div>
//                     <p>{review.review}</p>
//                     {reviewImage && <img src={reviewImage} alt="Review" />}
//                     <p>평점: {review.reviewRating}</p>
//                     <p>작성일: {review.reviewDate}</p>
//                     <button onClick={handleEdit}>수정</button>
//                     <button onClick={handleDelete}>삭제</button>
//                 </div>
//         </div>
//     );
// };

// export default ReviewDetail;