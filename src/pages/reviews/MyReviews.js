import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callReviewsByUserAPI } from '../../apis/ReviewAPICall';
import { decodeJwt } from "../../utils/tokenUtils";

const MyReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    
    const data = useSelector(state => state.reviewReducer || {});
    console.log("data", data);
    const reviews = data.reviews.data;
    // const productId = data.reviews.data.productId
    console.log("reviews : ", reviews);

    const pageInfo = useSelector((state) => state.reviewReducer.pageinfo || []);
    console.log("pageInfo : ", pageInfo);
    const [start, setStart] = useState(0);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (username) {
            console.log("username", username);
            dispatch(
                callReviewsByUserAPI({
                    currentPage: currentPage,
                    username: username,
                })
            );
        }
    }, [dispatch, currentPage, username]);

    const handleReviewClick = (reviewId, productId) => {
        navigate(`/mypage/reviews/detail/${productId}/${reviewId}`);
    };

    const handleAddReview = () => {
        navigate("/mypage/reviews/create");
    };

    console.log("reviews : ", reviews);

    return (
        <div>
            <h1>내가 작성한 리뷰</h1>
            <button onClick={handleAddReview}>리뷰 등록</button>
            <ul>
                {reviews && reviews.length > 0 ? (
                    reviews?.map(review => (
                        <li key={review.reviewId} onClick={() => handleReviewClick(review.reviewId, review.productId)}>
                            <p>{review.review}</p>
                            {review.reviewImage && (
                                <img src={review.reviewImage} alt="Review" style={{ width: '100px', height: 'auto' }} />
                            )}
                        </li>
                    ))
                ) : (
                    <p>작성한 리뷰가 없습니다.</p>
                )}
            </ul>
            <div
                style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Array.isArray(reviews) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className=""
                    >
                        &lt;
                    </button>
                )}
                {pageNumber?.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={
                                currentPage === num
                                    ? { backgroundColor: "lightgreen" }
                                    : null
                            }
                            className=""
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(reviews) && (
                    <button
                        className=""
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === pageInfo.pageEnd ||
                            pageInfo.total === 0
                        }
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
        
    );
};

export default MyReviews;
