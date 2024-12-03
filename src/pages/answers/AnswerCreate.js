import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callAnswerCreateApi } from '../../apis/AnswerAPICalls';
import { useParams, useNavigate } from 'react-router-dom';

import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";
import createCSS from './css/AnswerCreate.module.css';

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
        <div className={createCSS.div_box}>
            {/* <h1>답변 작성</h1> */}

            <div className={UserInfoCSS.info}>
                <p style={{width: '100px'}}>답변 제목 : </p>
                <div style={{width: '600px'}} className={UserInfoCSS.txt}>
                    <input
                    name="answerTitle"
                    // placeholder="답변 제목"
                    onChange={onChangeHandler}
                    value={form.answerTitle}
                    />
                </div>
            </div>


            <div style={{display: 'flex', flexFlow: 'column'}} className={UserInfoCSS.info}>
                <p style={{width: '100px'}}>답변 제목 : </p>
                <div style={{border: '1px solid #222', marginTop: '20px', borderRadius: '10px', width: '80%', height: '200px', overflowY: 'scroll'}}>
                    <textarea
                    style={{width: '100%', height: '100%'}}
                    name="answerContent"
                    placeholder="답변 내용"
                    onChange={onChangeHandler}
                    value={form.answerContent}
                    />
                </div>
            </div>
            
            
            <button style={{width: '70px', height: '35px', margin: '0 15px 0 0' ,color: '#fff', backgroundColor: '#41535C', borderRadius: '8px'}} onClick={onSubmitHandler}>등록</button>
            <button style={{width: '70px', height: '35px', color: '#CF5346', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #CF5346'}} onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}

export default AnswerCreate;
