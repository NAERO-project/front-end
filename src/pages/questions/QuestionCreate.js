import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callQuestionCreateApi } from '../../apis/QuestionAPICalls';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

function QuestionCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ questionTitle: '', questionContent: '' });
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = () => {
        if (!form.questionTitle || !form.questionContent) {
            alert('제목과 내용을 모두 입력해야 합니다.');
            return;
        } else (
            alert('1:1 문의 등록이 완료되었습니다.')
        )
        dispatch(callQuestionCreateApi({ form, username }));
        navigate('/mypage/questions');
    };

    return (
        <div>
            <h1>새 문의 작성</h1>
            <input
                name="questionTitle"
                placeholder="제목"
                onChange={onChangeHandler}
            />
            <textarea
                name="questionContent"
                placeholder="내용"
                onChange={onChangeHandler}
            />
            <button onClick={onSubmitHandler}>등록</button>
            <button onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}

export default QuestionCreate;