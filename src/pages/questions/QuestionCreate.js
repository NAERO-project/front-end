import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuestion } from "../../apis/QuestionAPICalls";

function QuestionCreate() {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addQuestion({ questionTitle, questionContent, userId: 1 }) // 사용자 ID는 1로 가정
        ).then(() => {
            alert('문의가 등록되었습니다.');
            navigate('/questions');
        });
    };

    return (
        <div>
            <h1>문의 등록</h1>
            <form onSubmit={handleSubmit}>
                <label>제목</label>
                <input
                    type="text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    required
                />
                <label>내용</label>
                <textarea
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                    required
                />
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default QuestionCreate;
