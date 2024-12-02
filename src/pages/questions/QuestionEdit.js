import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callQuestionDetailApi, callQuestionDeleteApi, callQuestionUpdateApi } from '../../apis/QuestionAPICalls';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

import QuestionEditCSS from "./css/QuestionEdit.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";
import Footer from '../../components/common/Footer';

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

    const handleDelete = () => {
        if (window.confirm('정말로 이 문의를 삭제하시겠습니까?')) {
            dispatch(callQuestionDeleteApi(questionDetail.questionId, username)).then(() => {
                alert('문의가 성공적으로 삭제되었습니다.');
                navigate(`/mypage/questions`);
            }).catch((error) => {
                console.error('답변 삭제 중 오류 발생:', error);
                alert('답변 삭제에 실패했습니다.');
            });
        }
    };

    const onSubmitHandler = () => {
        dispatch(callQuestionUpdateApi({ questionId, username, form })).then(() => {
            // navigate(`/mypage/questions/detail/${questionId}`);
            navigate(`/mypage/questions`);
        });
    };

    console.log('questionDetail', questionDetail);
    console.log('form', form);
    return (
        <>
                <div className={QuestionEditCSS.box}>
            <div className={QuestionEditCSS.edit}>
                <div>
                    <h3>문의 수정</h3>
                </div>

                <div>
                    <button className={QuestionEditCSS.btn01} onClick={handleDelete}>삭제</button>
                    <button className={QuestionEditCSS.btn02} onClick={() => navigate(-1)}>취소</button>
                </div>
            </div>

            <div className={UserInfoCSS.info}>
				<label style={{margin: '10px 20px 0 0'}}>제목</label>

                <div className={UserInfoCSS.txt}>
                    <input
                        style={{padding: '5px 10px'}}
                        name="questionTitle"
                        value={form.questionTitle}
                        onChange={onChangeHandler}
                        // placeholder="제목을 입력하세요"
                    />
                </div>
			</div>

            <div className={UserInfoCSS.info}>
				<label style={{margin: '10px 20px 0 0'}}>내용</label>

                <div className={UserInfoCSS.txt} style={{width: '90%', height: '500px'}}>
                    <textarea 
                        style={{width: '100%', height: '500px', padding: '20px'}}
                        name="questionContent"
                        value={form.questionContent}
                        onChange={onChangeHandler}
                        // placeholder="내용을 입력하세요"
                    />
                </div>
			</div>

            <div className={QuestionEditCSS.btn_box} >
                <button
                className={QuestionEditCSS.btn03} 
                onClick={onSubmitHandler}>
                    수정
                </button>
            </div>
            
        </div>
        <Footer/>
        </>
        
    );
}

export default QuestionEdit;
