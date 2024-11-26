import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callAnswerDetailApi,
    callAnswerDeleteApi,
    callAnswerListApi,
} from '../../apis/AnswerAPICalls';

function AnswerDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const answer = useSelector(state => state.answerReducer.data?.answer || {});
    const question = useSelector(state => state.answerReducer.data?.question || {});
    const answerDetail = answer || {};
    const questionDetail = question || {};
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const userId = 7; // 사용자 ID, 필요에 따라 수정

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});

    // 답변 상세 정보를 가져오는 API 호출
    useEffect(() => {
        console.log('[answerDetail][questionsDetail] answerId & questionId : ', params.answerId, params.questionId);
        
        console.log("답변 ID:", params.answerId);
        console.log("질문 ID:", params.questionId);
        
        // 답변 상세 정보 가져오기
        dispatch(callAnswerDetailApi(params.answerId, params.questionId, userId)).then((response) => {
            console.log("답변 상세 정보:", response);
        }).catch((error) => {
            console.error("답변 상세 정보 가져오기 실패:", error);
        });

        // 질문 ID가 있을 경우 질문 정보와 해당 답변 목록 가져오기
        if (params.questionId) {
            dispatch(callAnswerListApi(params.questionId, userId)).then((response) => {
                console.log("질문 정보:", response);
                // 질문 정보와 관련된 답변 목록을 상태에 저장하는 로직 추가 가능
            }).catch((error) => {
                console.error("질문 정보 가져오기 실패:", error);
            });
        } else {
            console.error("questionId가 정의되지 않았습니다.");
        }
    }, [dispatch, params.answerId, params.questionId, userId]);


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            answerId: answerDetail.answerId,
            answerContent: answerDetail.answerContent,
            // 필요한 다른 필드 추가
        });
    };

    // 삭제 API 호출 및 처리
    const handleDelete = () => {
        if (window.confirm('정말로 이 답변을 삭제하시겠습니까?')) {
            dispatch(callAnswerDeleteApi(answerDetail.answerId, userId)).then(() => {
                alert('답변이 성공적으로 삭제되었습니다.');
                navigate(-1); // 삭제 후 이전 페이지로 이동
            }).catch((error) => {
                console.error('답변 삭제 중 오류 발생:', error);
                alert('답변 삭제에 실패했습니다.');
            });
        }
    };


    return (
        <div>
            <h1>답변 상세 페이지</h1>
            {question && (
                <div>
                    <h2>질문 제목: {question.questionTitle}</h2>
                    <p>질문 내용: {question.questionContent}</p>
                </div>
            )}
            {answer && (
                <div>
                    <h2>답변 제목: {answer.answerTitle}</h2>
                    <p>답변 내용: {answer.answerContent}</p>
                    <p>답변 날짜: {answer.answerDate}</p>
                    <p>답변 상태: {answer.questionStatus}</p>
                    <div>
                        {answer && (
                            (answer.questionStatus === true || answer.questionStatus === 1) ? (
                                <>
                                    <button onClick={() => navigate(`/answers/edit/${answerDetail.answerId}`)}>수정</button>
                                    <button onClick={handleDelete}>삭제</button>
                                </>
                            ) : (
                                <button onClick={() => navigate(`/answers/create/${answerDetail.questionId}`)}>답변 등록</button>
                            )
                        )}
                        <button onClick={() => navigate(-1)}>뒤로가기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnswerDetail;
