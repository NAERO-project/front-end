import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callQuestionDetailApi,
    callQuestionDeleteApi,
} from '../../apis/QuestionAPICalls'

function QuestionDetail() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const question = useSelector(state => state.questionReducer || {});
    const questionDetail = question || {};
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const userId = 1;

    const [modifyMode, setModifyMode] = useState(false);    
    const [form, setForm] = useState({});

    // 질문 상세 정보를 가져오는 API 호출
    useEffect(() => {
        console.log('[questionDetail] questionId : ', params.questionId);
        dispatch(callQuestionDetailApi(params.questionId, userId));            
    }, [dispatch, params.questionId, userId]);

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
            dispatch(callQuestionDeleteApi(questionDetail.questionId, userId)).then(() => {
                alert('질문이 성공적으로 삭제되었습니다.');
                navigate('/questions'); // 삭제 후 질문 목록으로 이동
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
            {questionDetail && (
                <div>
                    <h1>1:1 문의 상세 페이지</h1>
                    <h1>{questionDetail.questionTitle}</h1>
                    <p>{questionDetail.questionContent}</p>
                    <p>{questionDetail.questionDate}</p>
                    <p>{questionDetail.questionStatus}</p>
                    <div>
                        <button onClick={() => navigate(-1)}>뒤로가기</button>
                        <button onClick={handleDelete}>삭제</button>
                        <button onClick={() => navigate(`/questions/edit/${questionDetail.questionId}`)}>
                            수정 페이지로 이동
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default QuestionDetail;
