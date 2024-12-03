import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAnswerUpdateApi, callAnswerDetailApi } from '../../apis/AnswerAPICalls';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

import AnswerEditCSS from "./css/AnswerEdit.module.css";
import AnswerDetailCSS from "./css/AnswerDetail.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";

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
        <div className={AnswerDetailCSS.div_box}>
            <div className={AnswerDetailCSS.div}>
            {/* <h1>답변 수정</h1> */}
            <div className={UserInfoCSS.info}>
				<p style={{width: '100px'}}>답변 제목 : </p>
				<div>
                    <input
                    style={{width: '600px'}}
                    className={UserInfoCSS.txt}
                    name="answerTitle"
                    placeholder="답변 제목"
                    onChange={onChangeHandler}
                    value={form.answerTitle}
                    />
                </div>
			</div>

            <div style={{display: 'flex', flexFlow: 'column'}} className={UserInfoCSS.info}>
				<p style={{width: '100px'}}>답변 내용 : </p>
				<div>
                    <textarea
                    style={{width: '600px', marginTop: '20px', borderRadius: '10px', width: '80%', height: '200px', overflowY: 'scroll'}}
                    className={UserInfoCSS.txt}
                    name="answerContent"
                    placeholder="답변 내용"
                    onChange={onChangeHandler}
                    value={form.answerContent}
                    />
                </div>
			</div>

            <div className={AnswerDetailCSS.btn_box}>
                <button className={AnswerDetailCSS.btn} onClick={onSubmitHandler}>수정</button>
                <button className={AnswerDetailCSS.btn} onClick={() => navigate(-1)}>취소</button>
            </div>
            
        </div>
        </div>
    );
}

export default AnswerEdit;
