import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callAnswerCreateApi } from '../../apis/AnswerAPICalls';
import { useParams, useNavigate } from 'react-router-dom';

function AnswerCreate() {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ answerTitle: '', answerContent: '', answerEmpId: 7 });

    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async () => {
        if (!form.answerTitle || !form.answerContent) {
            alert('제목과 내용을 입력해 주세요.');
            return;
        }

        console.log("Submitting answerTitle:", form.answerTitle);
        console.log("Submitting answerContent:", form.answerContent);
        console.log("Submitting answerEmpId:", form.answerEmpId);
        console.log("Submitting questionId:", questionId);

        
        // API 호출
        const response = await dispatch(callAnswerCreateApi({ questionId, answerEmpId: form.answerEmpId, answerTitle: form.answerTitle, answerContent: form.answerContent }));
        // 응답 확인
        console.log("response", response);
        console.log("response.status", response.status);
        if (response && response.status === 200) {
            // 성공적으로 등록된 후 해당 질문의 답변 목록으로 이동
            navigate(`/admin/answers`);
        } else {
            // 응답이 성공적이지 않은 경우
            alert('답변 등록에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div>
            <h1>답변 작성</h1>
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
            <button onClick={onSubmitHandler}>등록</button>
            <button onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}

export default AnswerCreate;
