import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserQuestions } from "../../apis/QuestionAPICalls";
import { Link, useNavigate } from 'react-router-dom';

function Question() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux 상태 가져오기
    const questions = useSelector((state) => state.question?.questions || []);

    // 문의 목록 로드
    useEffect(() => {
        dispatch(getUserQuestions({ userId: 1, page: 1, size: 10 })); // userId는 예제 값
    }, [dispatch]);

    return (
        <div>
            <h1>1:1 문의 목록</h1>
            <button onClick={() => navigate('/questions/create')}>문의 등록</button>
            
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <Link to={`/questions/${question.id}`}>{question.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>문의글이 없습니다.</p> // 문의 목록이 없을 때 메시지 표시
            )}
        </div>
    );
}

export default Question;
