import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionDetailNav({ questionDetail }) {
    const navigate = useNavigate();

    const handleGoToQuestionList = () => {
        navigate('/questions'); // 질문 목록 페이지로 이동
    };

    const handleEditQuestion = (questionId) => {
        navigate(`/questions/edit/${questionId}`); // 질문 수정 페이지로 이동
    };

    return (
        <nav style={styles.nav}>
            <h2 style={styles.title}>질문 상세 내비게이션</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleGoToQuestionList}>
                    질문 목록으로 돌아가기
                </button>
                {questionDetail && (
                    <button style={styles.button} onClick={() => handleEditQuestion(questionDetail.questionId)}>
                        질문 수정
                    </button>
                )}
            </div>
            {/* 질문 상세 내용 표시 */}
            {questionDetail ? (
                <div style={styles.detailContainer}>
                    <h3>{questionDetail.questionTitle}</h3>
                    <p>{questionDetail.questionContent}</p>
                    <p>작성자: {questionDetail.user?.userName || '알 수 없음'}</p>
                    <p>작성일: {new Date(questionDetail.createdAt).toLocaleDateString() || '알 수 없음'}</p>
                </div>
            ) : (
                <div style={styles.detailContainer}>
                    <p>질문 정보를 불러오는 중입니다...</p>
                </div>
            )}
        </nav>
    );
}

// 스타일 객체
const styles = {
    nav: {
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
    },
    title: {
        margin: '0',
        fontSize: '1.5em',
    },
    buttonContainer: {
        marginTop: '10px',
    },
    button: {
        marginRight: '10px',
        padding: '8px 12px',
        fontSize: '1em',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        transition: 'background-color 0.3s',
    },
    detailContainer: {
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
    },
};

export default QuestionDetailNav;
