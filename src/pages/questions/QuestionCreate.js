import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callQuestionCreateApi } from '../../apis/QuestionAPICalls';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

import QuestionCreateCSS from "./css/QuestionCreate.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";
import Footer from '../../components/common/Footer';

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
        <>
                <div className={QuestionCreateCSS.box}>
            <div className={QuestionCreateCSS.create}>
                <div>
                    <h3>1:1 문의</h3>
                </div>  

                <div>
                    <button className={QuestionCreateCSS.btn01} onClick={onSubmitHandler}>등록</button>
                    <button className={QuestionCreateCSS.btn02} onClick={() => navigate(-1)}>취소</button>
                </div>
            </div>

            <div className={UserInfoCSS.info}>
				<label style={{margin: '10px 20px 0 0'}}>제목</label>

                <div className={UserInfoCSS.txt}>
                    <input
                        name="questionTitle"
                        // placeholder="제목"
                        onChange={onChangeHandler}
                    />
                </div>
			</div>

            <div className={UserInfoCSS.info}>
				<label style={{margin: '10px 20px 0 0'}}>내용</label>

                <div className={UserInfoCSS.txt} style={{width: '90%', height: '500px'}}>
                <textarea 
                    style={{width: '100%', height: '500px', padding: '20px'}}
                    name="questionContent"
                    // placeholder="내용"
                    onChange={onChangeHandler}
                />
            </div>
			</div>
        </div>
        <Footer/>
        </>
        
    );
}

export default QuestionCreate;
