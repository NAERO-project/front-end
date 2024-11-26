import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callQuestionListApi } from "../../apis/QuestionAPICalls";

function QuestionList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    // Redux 상태에서 질문 목록과 페이지 정보 가져오기
    const questions = useSelector((state) => state.questionReducer.data.content);
    const questionsList = useSelector((state) => state.questionReducer || []);
    const pageInfo = useSelector((state) => state.questionReducer.pageInfo || { pageEnd: 0 });
    const userId = 1; // 로그인된 사용자 ID

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (userId) {
            dispatch(
                callQuestionListApi({
                    currentPage: currentPage,
                    userId: userId,
                })
            );
        }
    }, [dispatch, currentPage, userId]);

useEffect(()=>{

    console.log("Redux questions:", questions);
    console.log("Redux questionsList:", questionsList);
},[questionsList])

    return (
        <div>
            <h1>문의 목록</h1>
            <button onClick={() => navigate("/questions/create")}>새 문의 작성</button>
            <ul>
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((question) => { 
                        console.log(question); // question 객체 확인
                        return (
                            <li key={question.id}>
                                <span
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                    onClick={() => navigate(`/questions/detail/${question.questionId}`)} // 상세 페이지로 이동
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
            <div>
                {[...Array(pageInfo.pageEnd)].map((_, idx) => (
                    <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)}>
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionList;
