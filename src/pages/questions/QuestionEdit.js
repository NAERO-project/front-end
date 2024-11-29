import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callQuestionDetailApi, callQuestionUpdateApi } from '../../apis/QuestionAPICalls';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

function QuestionEdit() {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questionDetail = useSelector((state) => state.questionReducer);
    const [form, setForm] = useState({ questionTitle: '', questionContent: '' });
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null; 

    useEffect(() => {
        dispatch(callQuestionDetailApi(questionId, username));
    }, [dispatch, questionId, username]);

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
        dispatch(callQuestionUpdateApi({ questionId, username, form })).then(() => {
            navigate(`/mypage/questions/detail/${questionId}`);
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
