import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callQuestionListApi } from "../../apis/QuestionAPICalls";
import { callAnswerApi } from "../../apis/AnswerAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

import QuestionListCSS from "./css/QuestionListCSS.module.css";
import ProductMoreCSS from "../products/css/ProductMore.module.css";
import Footer from "../../components/common/Footer";

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
    <>
        <div className={QuestionListCSS.box}>
            <div className={QuestionListCSS.question}>
                <div>
                    <h3>1:1 문의</h3>
                </div>
    
                <div>
                    <button className={QuestionListCSS.new_btn} onClick={() => navigate("/mypage/questions/create")}>
                        문의하기
                    </button>
                </div>
            </div>
    
            <table className={QuestionListCSS.question_table}>
                <colgroup>
                    <col width="40%" />
                    <col width="30%" />
                    <col width="30%" />
                </colgroup>
                <thead className={QuestionListCSS.question_thead}>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody className={QuestionListCSS.question_tbody}>
                    {Array.isArray(questionsList) && questionsList.length > 0 ? (
                        questionsList.map((question) => {
                            console.log(question); // question 객체 확인
    
                            return (
                                <tr
                                    key={question.questionId}
                                    onClick={() =>
                                        setSelectedQuestion((prev) =>
                                            prev?.questionId === question.questionId
                                                ? null
                                                : question
                                        )
                                    }
                                >
                                    <td>{question.questionTitle}</td>
                                    <td>{question?.questionDate
                                    ? question.questionDate
                                          .replace("T", " ")
                                          .replace("Z", "") // "T"를 공백으로, "Z"를 제거
                                    : "정보 없음"}</td>
                                    
                                    <td>
                                        {question.questionStatus === true || question.questionStatus === 1
                                            ? "답변 완료"
                                            : "답변 미완료"}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>등록된 문의가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
    
            {selectedQuestion && (
                <div className={QuestionListCSS.edit_question}>
                    <div>
                        <p>제목: {selectedQuestion.questionTitle}</p>
                        <p>내용: {selectedQuestion.questionContent}</p>
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
    
            <div className={ProductMoreCSS.product_paging} style={{ padding: '50px 0 0 0' }}>
                {Array.isArray(questionsList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
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
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(questionsList) && (
                    <button
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
        <Footer/>
    </>
        
    );
}

export default QuestionList;
