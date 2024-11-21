import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionById, updateQuestion } from "../../apis/QuestionAPICalls";

function QuestionEdit() {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 문의 데이터 상태
    const question = useSelector((state) => state.question.question);

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionContent, setQuestionContent] = useState("");

    // 문의 상세 데이터 불러오기
    useEffect(() => {
        if (questionId) {
            dispatch(getQuestionById({ userId: 1, questionId })); // userId는 로그인된 사용자 ID
        }
    }, [dispatch, questionId]);

    // 데이터 로드 후 상태 초기화
    useEffect(() => {
        if (question) {
            setQuestionTitle(question.title);
            setQuestionContent(question.content);
        }
    }, [question]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = 1; // 로그인된 사용자 ID

        dispatch(updateQuestion({ questionId, questionTitle, questionContent, userId }))
            .then(() => {
                alert("문의가 수정되었습니다.");
                navigate(`/questions/${questionId}`); // 수정 후 상세 페이지로 이동
            })
            .catch((error) => {
                console.error("Error updating question:", error);
            });
    };

    return (
        <div>
            <h1>문의 수정</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용</label>
                    <textarea
                        value={questionContent}
                        onChange={(e) => setQuestionContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default QuestionEdit;
