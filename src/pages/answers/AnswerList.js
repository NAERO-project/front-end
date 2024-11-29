import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { callAnswerListApi, callQuestionListApi } from "../../apis/AnswerAPICalls";
import { GET_ANSWERS, GET_ALL_QUESTIONS } from "../../modules/AnswerModule";

function AnswerList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 질문과 답변 데이터를 각각 가져오기
    const questionsList = useSelector((state) => state.answerReducer.questions || []);
    const answersList = useSelector((state) => state.answerReducer.answers || []);
    const pageInfo = useSelector((state) => state.answerReducer.pageInfo || { pageEnd: 0 });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // 답변 목록 API 호출
        dispatch(callAnswerListApi({ currentPage }))
            .then((response) => {
                if (response && response.status === 200) {
                    dispatch({ type: GET_ANSWERS, payload: response.data });
                }
            });

        // 질문 목록 API 호출
        dispatch(callQuestionListApi({ currentPage }))
            .then((response) => {
                if (response && response.status === 200) {
                    dispatch({ type: GET_ALL_QUESTIONS, payload: response.data });
                }
            });
    }, [dispatch, currentPage]);

    console.log("questionsList", questionsList);
    console.log("answersList", answersList);

    const pageNumber = [];
    if (pageInfo.pageEnd > 0) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    return (
<div>
    <h1>답변 목록 페이지</h1>
    {Array.isArray(questionsList) && questionsList.length > 0 ? (
        <ul>
            {questionsList.map((question) => {
                // 각 질문에 대한 답변 필터링
                const questionAnswers = answersList.filter(
                    (answer) => answer.questionId === question.questionId
                );

                return (
                    <li key={question.questionId}>
                        {/* 질문 제목을 클릭하면 해당 질문에 대한 상세 페이지로 이동 */}
                        <Link
                            to={`/admin/answers/detail/${question.questionId}/${
                                questionAnswers.length > 0 ? questionAnswers[0].answerId : "0"
                            }`}
                        >
                            <h3>제목: {question.questionTitle}</h3>
                        </Link>
                        <p>질문 상태: {question.questionStatus === 1 ? "답변 완료" : "답변 미완료"}</p>

                        {questionAnswers.length > 0 ? (
                            <ul>
                                {questionAnswers.map((answer) => (
                                    <li key={answer.answerId}>
                                        <p>답변: {answer.answerTitle}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>답변이 없습니다.</p>
                        )}
                    </li>
                );
            })}
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
