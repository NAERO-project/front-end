import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callAnswerDetailApi,
    callAnswerDeleteApi
} from '../../apis/AnswerAPICalls';
import {
    callQuestionDetailApi
} from '../../apis/QuestionAPICalls';

function AnswerDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const answer = useSelector(state => state.answerReducer.answer || {});
    console.log("answer", answer);
    
    const question = useSelector(state => state.answerReducer.question || {});
    console.log("question", question);
    const answerDetail = answer || {};
    console.log("answerDetail", answerDetail);
    const questionDetail = question || {};
    console.log("questionDetail", questionDetail);
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});

    // 답변 상세 정보를 가져오는 API 호출
    useEffect(() => {
        console.log('[answerDetail][questionsDetail] answerId & questionId : ', params.answerId, params.questionId);
        
        console.log("답변 ID:", params.answerId);
        console.log("질문 ID:", params.questionId);
        
        // 질문 상세 정보 가져오기
        if (params.questionId) {
            dispatch(callQuestionDetailApi(params.questionId, username)).then((response) => {
                console.log("질문 상세 정보:", response);
            }).catch((error) => {
                console.error("질문 상세 정보 가져오기 실패:", error);
            });
        }

        // 답변이 있는 경우에만 답변 상세 정보 가져오기
        if (params.answerId !== "none") {
            dispatch(callAnswerDetailApi(params.answerId, params.questionId, username)).then((response) => {
                console.log("답변 상세 정보:", response);
            }).catch((error) => {
                console.error("답변 상세 정보 가져오기 실패:", error);
            });
        }
    }, [dispatch, params.answerId, params.questionId, username]);

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
            dispatch(callAnswerDeleteApi(answerDetail.answerId, username)).then(() => {
                alert('답변이 성공적으로 삭제되었습니다.');
                navigate(`/admin/answers`);
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
                    <p>최초 질문 작성 시간: {question.questionDate}</p>
                    <p>최종 질문 작성 시간: {question.questionUpdate}</p>
                </div>
            )}

            {/* answerId가 "none"인 경우 답변 등록만 가능하도록 처리 */}
            {params.answerId === "0" ? (
                <div>
                    <p>답변이 없습니다.</p>
                    <button onClick={() => navigate(`/admin/answers/create/${question.questionId}`)}>
                        답변 등록
                    </button>
                </div>
            ) : (
                answer && answer.questionId === question.questionId && (
                    <div>
                        <h2>답변 제목: {answer.answerTitle}</h2>
                        <p>답변 내용: {answer.answerContent}</p>
                        <p>최초 답변 작성 날짜: {answer.answerDate}</p>
                        <p>최종 답변 작성 날짜: {answer.answerUpdate}</p>
                        <div>
                            <button
                                onClick={() =>
                                    navigate(`/admin/answers/edit/${question.questionId}/${answer.answerId}`)
                                }
                            >
                                수정
                            </button>
                            <button onClick={handleDelete}>삭제</button>
                        </div>
                    </div>
                )
            )}

            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
    );
}

export default AnswerDetail;
