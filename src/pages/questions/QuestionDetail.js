import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionById, deleteQuestion } from "../../apis/QuestionAPICalls";

function QuestionDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const question = useSelector((state) => state.question.question);

    useEffect(() => {
        dispatch(getQuestionById({ userId: 1, questionId: id })); // 사용자 ID는 1로 가정
    }, [dispatch, id]);

    const handleDelete = () => {
        dispatch(deleteQuestion({ userId: 1, questionId: id })).then(() => {
            alert('문의가 삭제되었습니다.');
            navigate('/questions');
        });
    };

    if (!question) return <p>Loading...</p>;

    return (
        <div>
            <h1>{question.title}</h1>
            <p>{question.content}</p>
            <button onClick={() => navigate(`/questions/edit/${id}`)}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
}

export default QuestionDetail;
