import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callQuestionDetailApi, callQuestionUpdateApi } from '../../apis/QuestionAPICalls';
import { useParams, useNavigate } from 'react-router-dom';

function QuestionEdit() {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questionDetail = useSelector((state) => state.questionReducer.data);
    const [form, setForm] = useState({ questionTitle: '', questionContent: '' });
    const userId = 1;

    useEffect(() => {
        dispatch(callQuestionDetailApi(questionId, userId));
    }, [dispatch, questionId, userId]);

    useEffect(() => {
        if (questionDetail) {
            setForm({ 
                questionTitle: questionDetail.questionTitle, 
                questionContent: questionDetail.questionContent 
            });
        }
    }, [questionDetail]);

    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = () => {
        dispatch(callQuestionUpdateApi({ questionId, userId, form })).then(() => {
            navigate(`/questions/detail/${questionId}`);
        });
    };

    console.log('questionDetail', questionDetail);
    console.log('form', form);
    return (
        <div>
            <h1>문의 수정</h1>
            <input
                name="questionTitle"
                value={form.questionTitle}
                onChange={onChangeHandler}
                placeholder="제목을 입력하세요"
            />
            <textarea
                name="questionContent"
                value={form.questionContent}
                onChange={onChangeHandler}
                placeholder="내용을 입력하세요"
            />
            <button onClick={onSubmitHandler}>수정</button>
            <button onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}

export default QuestionEdit;
