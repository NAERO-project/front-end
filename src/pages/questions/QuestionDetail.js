import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callAnswerApi
} from '../../apis/AnswerAPICalls';
import {
    callQuestionDetailApi,
    callQuestionDeleteApi,
} from '../../apis/QuestionAPICalls';

function AnswerDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    // Redux 상태에서 질문과 답변 정보를 가져옴
    const question = useSelector(state => state.questionReducer);
    const answer = useSelector(state => state.answerReducer);
    
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에서 토큰 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    // 질문 및 답변 상세 정보를 가져오는 API 호출
    useEffect(() => {
        async function fetchDetails() {
            try {
                if (params.questionId && username) {
                    console.log('[answerDetail][questionDetail] questionId : ', params.questionId);
                    setLoading(true);
                    
                    // 질문 상세 정보 가져오기
                    await dispatch(callQuestionDetailApi(params.questionId, username));
                }
            } catch (error) {
                console.error("질문 상세 정보 가져오기 실패:", error);
            } finally {
                setLoading(false);
            }
        }

        if (username) {
            fetchDetails();
        }
    }, [dispatch, params.questionId, username]);

    useEffect(() => {
        // questionStatus를 이용해 답변 존재 여부 확인 후 답변 상세 정보 가져오기
        if (question && (question.questionStatus === true || question.questionStatus === 1)) {
            console.log("답변 존재 확인됨, 답변 불러오기...");
            if (params.questionId && username) {
                dispatch(callAnswerApi(params.questionId));
            }
        } 
    }, [question, params.questionId, username, dispatch]);

    const handleDelete = () => {
        if (window.confirm('정말로 이 문의를 삭제하시겠습니까?')) {
            dispatch(callQuestionDeleteApi(question.questionId, username)).then(() => {
                alert('문의가 성공적으로 삭제되었습니다.');
                navigate(`/mypage/questions`);
            }).catch((error) => {
                console.error('답변 삭제 중 오류 발생:', error);
                alert('답변 삭제에 실패했습니다.');
            });
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>문의 상세 페이지</h1>
            {question && question.questionTitle ? (
                <div>
                    <h2>질문 제목: {question.questionTitle}</h2>
                    <p>질문 내용: {question.questionContent}</p>
                    {/* <p>최초 질문 작성 시간: {question.questionDate || '정보 없음'}</p>
                    <p>최종 질문 작성 시간: {question.questionUpdate || '정보 없음'}</p> */}
                    {/* 질문 상태에 따라 수정 버튼 보이기/숨기기 */}
                    {question.questionStatus !== true && question.questionStatus !== 1 && (
                        <div>
                            <button
                                onClick={() =>
                                    navigate(`/mypage/questions/edit/${question.questionId}`)
                                }
                            >
                                수정
                            </button>
                        </div>
                    )}
                    <button onClick={handleDelete}>삭제</button>
                </div>
            ) : (
                <p>질문 정보를 불러올 수 없습니다.</p>
            )}
    
            {/* 답변이 있는 경우에만 답변 정보를 보여줌 */}
            {
                question && (question.questionStatus === true || question.questionStatus === 1) ? (
                    answer && answer.answerId ? (
                        <div>
                            <h2>답변 제목: {answer.answerTitle || '답변 제목 없음'}</h2>
                            <p>답변 내용: {answer.answerContent || '답변 내용 없음'}</p>
                        </div>
                    ) : (
                        <div>
                            <p>답변이 없습니다.</p>
                        </div>
                    )
                ) : (
                    <div>
                        <p>답변이 없습니다.</p>
                    </div>
                )
            }

    
            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
    );
    
}

export default AnswerDetail;
