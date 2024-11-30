import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAnswerUpdateApi, callAnswerDetailApi } from '../../apis/AnswerAPICalls';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

function AnswerEdit() {
    const { questionId, answerId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const answer = useSelector((state) => state.answerReducer.answer);
    const [form, setForm] = useState({ answerTitle: '', answerContent: '', answerEmpId: 7 });

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;
    
    useEffect(() => {
        const fetchAnswerDetail = async () => {
            const response = await dispatch(callAnswerDetailApi(answerId, questionId , username));
            if (answer) {
                setForm({
                    answerTitle: answer.answerTitle,
                    answerContent: answer.answerContent,
                    answerEmpId: answer.answerEmpId,
                });
            }
        };
        fetchAnswerDetail();
    }, [questionId, answerId]);

    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async () => {
        if (!form.answerTitle || !form.answerContent) {
            alert('제목과 내용을 입력해 주세요.');
            return;
        }

        console.log("Updating answerTitle:", form.answerTitle);
        console.log("Updating answerContent:", form.answerContent);
        console.log("Updating answerEmpId:", form.answerEmpId);

        try {
            await dispatch(callAnswerUpdateApi({ 
                questionId, 
                answerId, 
                answerEmpId: form.answerEmpId, 
                answerTitle: form.answerTitle, 
                answerContent: form.answerContent 
            }));
            navigate(`/admin/answers/detail/${questionId}/${answerId}`);
        } catch (error) {
            console.error("답변 수정 중 오류 발생:", error);
            alert('답변 수정에 실패했습니다. 오류: ' + error.message);
        }
    };

    return (
        <div>
            <h1>답변 수정</h1>
            <input
                name="answerTitle"
                placeholder="답변 제목"
                onChange={onChangeHandler}
                value={form.answerTitle}
            />
            <textarea
                name="answerContent"
                placeholder="답변 내용"
                onChange={onChangeHandler}
                value={form.answerContent}
            />
            <button onClick={onSubmitHandler}>수정</button>
            <button onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}

export default AnswerEdit;
