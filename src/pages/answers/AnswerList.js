import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callAnswerListApi } from "../../apis/AnswerAPICalls"; // 답변 목록 API 호출 함수
import { callQuestionListApi } from "../../apis/AnswerAPICalls"; // 질문 목록 API 호출 함수
import { GET_ANSWERS, GET_ALL_QUESTIONS } from "../../modules/AnswerModule"; // 액션 타입 가져오기
import { Link } from 'react-router-dom';

function AnswerList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const questions = useSelector((state) => state.answerReducer.data?.content || []);
    const questionsList = useSelector((state) => state.answerReducer || []);
    const answers = useSelector((state) => state.answerReducer.data?.content || []); // 답변 목록 가져오기
    const answersList = useSelector((state) => state.answerReducer || []);
    const pageInfo = useSelector((state) => state.answerReducer.pageInfo || { pageEnd: 0 });
    
    const [start, setStart] = useState(0);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }


    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //     dispatch(
    //         callAnswerListApi({
    //             currentPage: currentPage
    //         })
    //     )
    // }, [dispatch, currentPage]);

    // useEffect(() => {
    //     dispatch(
    //         callQuestionListApi({
    //             currentPage: currentPage
    //         })
    //     )
    // }, [dispatch, currentPage]);

    useEffect(() => {
        // 답변 목록 API 호출
        dispatch(callAnswerListApi({ currentPage }))
            .then(response => {
                dispatch({ type: GET_ANSWERS, payload: response.data }); // 답변 상태 업데이트
            });

        // 질문 목록 API 호출
        dispatch(callQuestionListApi({ currentPage }))
            .then(response => {
                dispatch({ type: GET_ALL_QUESTIONS, payload: response.data }); // 질문 상태 업데이트
            });
    }, [dispatch, currentPage]);

    console.log("questions", questions);
    console.log("questionsList", questionsList);
    console.log("answers", answers);
    console.log("answersList", answersList);
    return (
        <div>
            <h1>답변 목록 페이지</h1>
            {questionsList.length > 0 ? (
                <ul>
                    {questionsList.map((question) => (
                        <li key={question.questionId}>
                            <Link to={`/answers/detail/${question.questionId}`}>
                                <h3>제목: {question.questionTitle}</h3>
                            </Link>
                            <p>질문 상태: {question.questionStatus === 1 ? '답변 완료' : '답변 미완료'}</p>
                            
                            {/* 해당 질문에 대한 답변 표시 */}
                            {answersList.filter(answer => answer.questionId === question.questionId).length > 0 ? (
                                <ul>
                                    {answers.filter(answer => answer.questionId === question.questionId).map(answer => (
                                        <li key={answer.answerId}>
                                            <p>답변: {answer.answerContent}</p> {/* 답변 내용 표시 */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>답변이 없습니다.</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>등록된 질문이 없습니다.</p>
            )}
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

export default AnswerList;
