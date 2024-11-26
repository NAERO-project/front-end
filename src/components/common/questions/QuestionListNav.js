import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callQuestionListApi } from "../../apis/QuestionAPICalls";

function QuestionListNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questionReducer.questions || []);
    const userId = 1; // 실제 사용자 ID로 변경 필요

    useEffect(() => {
        // 컴포넌트가 마운트될 때 질문 목록을 가져옵니다.
        dispatch(callQuestionListApi({ userId, currentPage: 1 }));
    }, [dispatch, userId]);

    const handleCreateQuestion = () => {
        navigate("/questions/create"); // 질문 작성 페이지로 이동
    };

    const handleGoToQuestionList = () => {
        navigate("/questions"); // 질문 목록 페이지로 이동
    };

    const onClickQuestion = (questionId) => {
        navigate(`/questions/${questionId}`); // 질문 상세 페이지로 이동
    };

    return (
        <nav style={styles.nav}>
            <h2 style={styles.title}>질문 목록</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleGoToQuestionList}>
                    질문 목록으로 돌아가기
                </button>
                <button style={styles.button} onClick={handleCreateQuestion}>
                    새 질문 작성
                </button>
            </div>
            <ul style={styles.questionList}>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <li
                            key={question.id}
                            style={styles.questionItem}
                            onClick={() => onClickQuestion(question.id)}
                        >
                            {question.title}
                        </li>
                    ))
                ) : (
                    <li>등록된 문의가 없습니다.</li>
                )}
            </ul>
        </nav>
    );
}

// 스타일 객체
const styles = {
    nav: {
        padding: "10px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
    },
    title: {
        margin: "0",
        fontSize: "1.5em",
    },
    buttonContainer: {
        marginTop: "10px",
    },
    button: {
        marginRight: "10px",
        padding: "8px 12px",
        fontSize: "1em",
        cursor: "pointer",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "white",
        transition: "background-color 0.3s",
    },
    questionList: {
        marginTop: "15px",
        listStyleType: "none",
        padding: "0",
    },
    questionItem: {
        padding: "8px",
        cursor: "pointer",
        borderBottom: "1px solid #dee2e6",
    },
};

export default QuestionListNav;
