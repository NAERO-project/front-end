import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callQuestionListApi } from "../../apis/QuestionAPICalls";
import { callAnswerApi } from "../../apis/AnswerAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function QuestionList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux 상태에서 질문 목록과 페이지 정보 가져오기
    const questionsList = useSelector(
        (state) => state.questionReducer.data || []
    );
    const answer = useSelector((state) => state.answerReducer);

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    const pageInfo = useSelector(
        (state) => state.questionReducer.pageInfo || { pageEnd: 0 }
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // 질문 목록을 가져오는 useEffect
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

    useEffect(() => {
        // questionStatus를 이용해 답변 존재 여부 확인 후 답변 상세 정보 가져오기
        if (
            questionsList &&
            (questionsList.questionStatus === true ||
                questionsList.questionStatus === 1)
        ) {
            console.log("답변 존재 확인됨, 답변 불러오기...");
            if (questionsList.questionId && username) {
                dispatch(callAnswerApi(questionsList.questionId));
            }
        }
    }, [questionsList, username]);

    // 질문 목록이 업데이트될 때 로그 찍기
    useEffect(() => {
        console.log("Redux questionsList:", questionsList);
    }, [questionsList]);

    // 페이지 버튼 생성 로직
    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <div>
            <h1>1:1 문의 목록</h1>
            <button onClick={() => navigate("/mypage/questions/create")}>
                새 문의 작성
            </button>
            <ul>
                {Array.isArray(questionsList) && questionsList.length > 0 ? (
                    questionsList.map((question) => {
                        console.log(question); // question 객체 확인

                        // 답변이 없으면 answerId를 "0"으로 설정
                        const answerId = question.answerId
                            ? question.answerId
                            : "0";

                        return (
                            <li
                                key={question.questionId}
                                onClick={() =>
                                    setSelectedQuestion((prev) =>
                                        prev?.questionId === question.questionId
                                            ? null
                                            : question
                                    )
                                }
                            >
                                <div>
                                    <span>제목: {question.questionTitle}</span>
                                    <span>작성일: {question.questionDate}</span>
                                    <span>
                                        상태:{" "}
                                        {question.questionStatus === true ||
                                        question.questionStatus === 1
                                            ? "답변 완료"
                                            : "답변 미완료"}
                                    </span>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li>등록된 문의가 없습니다.</li>
                )}
            </ul>

            {selectedQuestion && (
                <div>
                    <div>
                        <p>제목: {selectedQuestion.questionTitle}</p>
                        <p>내용: {selectedQuestion.questionContent}</p>
                        {/* <p>작성일: {selectedQuestion.questionDate}</p> */}
                        {/* <p>
                            상태:{" "}
                            {selectedQuestion.questionStatus === true ||
                            selectedQuestion.questionStatus === 1
                                ? "답변 완료"
                                : "답변 미완료"}
                        </p> */}
                    </div>
                    {!!!selectedQuestion.questionStatus && (
                        <div>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/mypage/questions/edit/${selectedQuestion.questionId}`
                                    )
                                }
                            >
                                수정
                            </button>
                        </div>
                    )}
                    {selectedQuestion &&
                    (selectedQuestion.questionStatus === true ||
                        selectedQuestion.questionStatus === 1) ? (
                        answer && answer.answerId ? (
                            <div>
                                <p>
                                    답변 제목:{" "}
                                    {answer.answerTitle || "답변 제목 없음"}
                                </p>
                                <p>
                                    답변 내용:{" "}
                                    {answer.answerContent || "답변 내용 없음"}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p>답변이 없습니다.</p>
                            </div>
                        )
                    ) : (
                        <div>
                            <p>답변이 없습니다.</p>
                        </div>
                    )}
                </div>
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

export default QuestionList;
