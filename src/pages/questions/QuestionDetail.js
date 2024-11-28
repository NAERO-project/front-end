import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callQuestionDetailApi,
    callQuestionDeleteApi,
} from '../../apis/QuestionAPICalls'

import {
    callAnswerDetailApi
} from '../../apis/AnswerAPICalls'

function QuestionDetail() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const question = useSelector(state => state.questionReducer || {});     
    const questionDetail = question || {};
    const answer = useSelector(state => state.answerReducer.answer || {});
    const answerDetail = answer || {};
    console.log("answerDetail", answerDetail);
    console.log("answer", answer);
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null; 
    

    const [modifyMode, setModifyMode] = useState(false);    
    const [form, setForm] = useState({});

    // 질문 상세 정보를 가져오는 API 호출
    useEffect(() => {
        console.log('[questionDetail] questionId : ', params.questionId);
        
        dispatch(callQuestionDetailApi(params.questionId, params.answerId, username));            
    }, [dispatch, params.questionId, params.answerId, username]);

    useEffect(() => {
        
        console.log('[answerIdDetail] answerId : ', params.answerId)
        dispatch(callAnswerDetailApi(params.answerId, params.questionId, username))
    }, [dispatch, params.answerId, params.questionId, username])

    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            questionId: questionDetail.questionId,
            questionTitle: questionDetail.questionTitle,
            questionContent: questionDetail.questionContent,
            questionDate: questionDetail.questionDate,
            questionUpdate: questionDetail.questionUpdate,
            questionStatus: questionDetail.questionStatus,
        });
    };

    // 삭제 API 호출 및 처리
    const handleDelete = () => {
        if (window.confirm('정말로 이 질문을 삭제하시겠습니까?')) {
            dispatch(callQuestionDeleteApi(questionDetail.questionId, username)).then(() => {
                alert('질문이 성공적으로 삭제되었습니다.');
                navigate('/mypage/questions'); // 삭제 후 질문 목록으로 이동
            }).catch((error) => {
                console.error('질문 삭제 중 오류 발생:', error);
                alert('질문 삭제에 실패했습니다.');
            });
        }
    };

    console.log("question", question);
    console.log("questionDetail", questionDetail);

    return (
        <>
            <div>
            <h1>답변 상세 페이지</h1>
            {questionDetail && (
                <div>
                    <h2>질문 제목: {questionDetail.questionTitle}</h2>
                    <p>질문 내용: {questionDetail.questionContent}</p>
                </div>
            )}
            {answer ? (
                <div>
                    <h2>답변 제목: {answer.answerTitle}</h2>
                    <p>답변 내용: {answer.answerContent}</p>
                    <p>답변 날짜: {answer.answerDate}</p>
                    <p>답변 상태: {answer.questionStatus}</p>
                    <div>
                        {questionDetail.questionStatus === true || questionDetail.questionStatus === 1 ? (
                            <>
                                <button onClick={handleDelete}>삭제</button>
                                <button onClick={() => navigate(`/mypage/questions/edit/${questionDetail.questionId}`)}>
                                    수정 페이지로 이동
                                </button>
                            </>
                        ) : null}
                    </div>
                </div>
            ) : (
                <p>답변이 없습니다.</p>
            )}
        </div>
        </>
    );
}

export default QuestionDetail;
