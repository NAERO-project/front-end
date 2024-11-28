import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callQuestionListApi } from "../../apis/QuestionAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function QuestionList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    // Redux 상태에서 질문 목록과 페이지 정보 가져오기
    const data = useSelector((state) => state.questionReducer|| {});
    const questions = data.data? data.data.content : [];
    const questionsList = useSelector((state) => state.questionReducer.data || []);
    const pageInfo = useSelector((state) => state.questionReducer.pageInfo || { pageEnd: 0 });
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;

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
                callQuestionListApi({
                    currentPage: currentPage,
                    username: username,
                })
            );
        }
    }, [dispatch, currentPage, username]);

useEffect(()=>{

    console.log("Redux questions:", questions);
    console.log("Redux questionsList:", questionsList);
},[questionsList])

    return (
        <div>
            <h1>문의 목록</h1>
            <button onClick={() => navigate("/mypage/questions/create")}>새 문의 작성</button>
            <ul>
                {Array.isArray(questionsList) && questionsList.length > 0 ? (
                    questionsList.map((question) => { 
                        console.log(question); // question 객체 확인
                        return (
                            <li key={question.id}>
                                <span
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                    onClick={() => navigate(`/mypage/questions/detail/${question.questionId}`)} // 상세 페이지로 이동
                                >
                                    {question.questionTitle},
                                    {question.questionDate},
                                    {question.questionState}
                                </span>
                            </li>
                        );
                    })
                ) : (
                    <li>등록된 문의가 없습니다.</li>
                )}
            </ul>
            <div
                style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Array.isArray(questionsList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className=""
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
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
                {Array.isArray(questionsList) && (
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
}

export default QuestionList;
