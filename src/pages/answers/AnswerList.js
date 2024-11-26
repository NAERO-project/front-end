import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callAnswerListApi } from "../../apis/AnswerAPICalls"; // 답변 목록 API 호출 함수
import { Link } from 'react-router-dom'; // 추가: Link 컴포넌트 가져오기
import { callQuestionListApi } from "../../apis/AnswerAPICalls";

function AnswerList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const questions = useSelector((state) => state.answerReducer.data?.content || []);
    const questionsList = useSelector((state) => state.answerReducer || []);
    const answers = useSelector((state) => state.answerReducer.data?.content || []); // 답변 목록 가져오기
    const answersList = useSelector((state) => state.answerReducer || []);
    const pageInfo = useSelector((state) => state.answerReducer.pageInfo || { pageEnd: 0 });
    

    // const userId = useSelector((state) => state.userReducer.userId);

    const [currentPage, setCurrentPage] = useState(1);


    // 컴포넌트가 마운트될 때 모든 답변 목록을 가져옵니다.
    // useEffect(() => {
    //     dispatch(callAnswerListApi({}));
    //     dispatch(callQuestionListApi({}));
    // }, [dispatch]);
    
    // useEffect(() => {
    //     console.log("Redux answers", answers);
    //     console.log("Redux answersList", answersList);
    //     console.log("Redux questions", questions);
    //     console.log("Redux questionsList", questionsList);
    // },[answersList, questionsList])
    // 컴포넌트가 마운트될 때 모든 답변 목록과 질문 목록을 가져옵니다.
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(callAnswerListApi({ page: currentPage })), // 모든 답변 목록 API 호출
                    dispatch(callQuestionListApi({ page: currentPage })) // 모든 질문 목록 API 호출
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dispatch, currentPage]);
    

    return (
        <div>
            <h1>답변 목록 페이지</h1>
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question, answer) => (
                        <li key={question.questionId}>
                            <Link to={`/answers/detail/${question.questionId}/${answer.answerId}`}> {/* 상세 페이지로 이동하는 링크 추가 */}
                                <h3>제목: {question.questionTitle}</h3>    
                            </Link>
                            {/* 질문 상태 표시 */}
                            <p>질문 상태: {question.questionStatus === 1 ? '답변 완료' : '답변 미완료'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>등록된 질문이 없습니다.</p>
            )}
        </div>
    );
}

export default AnswerList;
