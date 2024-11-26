import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionCreateNav() {
    const navigate = useNavigate();

    const handleGoToQuestionList = () => {
        navigate('/questions'); // 질문 목록 페이지로 이동
    };

    return (
        <nav style={styles.nav}>
            <h2 style={styles.title}>새 문의 작성</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleGoToQuestionList}>
                    질문 목록으로 돌아가기
                </button>
            </div>
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
};

export default QuestionCreateNav;
