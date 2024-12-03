import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { callAnswerListApi, callQuestionListApi } from "../../apis/AnswerAPICalls";
import { GET_ANSWERS, GET_ALL_QUESTIONS } from "../../modules/AnswerModule";

import AnswerListCSS from "./css/AnswerList.module.css";
import ProductMoreCSS from "../products/css/ProductMore.module.css";

function AnswerList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const questionsList = useSelector((state) => state.answerReducer.questions || []);
    const answersList = useSelector((state) => state.answerReducer.answers || []);
    const pageInfo = useSelector((state) => state.answerReducer.pageInfo || { pageEnd: 0 });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callAnswerListApi({ currentPage }))
            .then((response) => {
                if (response && response.status === 200) {
                    dispatch({ type: GET_ANSWERS, payload: response.data });
                }
            });

        dispatch(callQuestionListApi({ currentPage }))
            .then((response) => {
                if (response && response.status === 200) {
                    dispatch({ type: GET_ALL_QUESTIONS, payload: response.data });
                }
            });
    }, [dispatch, currentPage]);

    const pageNumber = [];
    if (pageInfo.pageEnd > 0) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <div className={AnswerListCSS.box}>
            {Array.isArray(questionsList) && questionsList.length > 0 ? (
                <ul>
                    {questionsList.map((question) => {
                        const questionAnswers = answersList.filter(
                            (answer) => answer.questionId === question.questionId
                        );

                        return (
                            
                            <Link className={AnswerListCSS.link}
                                    to={`/admin/answers/detail/${question.questionId}/${
                                        questionAnswers.length > 0 ? questionAnswers[0].answerId : "0"
                                    }`}
                                >
                                        <li className={AnswerListCSS.li_box} key={question.questionId}>
                                    <h4 style={{ width: '450px', padding: '12px 0 0 0' }}>{question.questionTitle}</h4>
                                
                                <div style={{width: '1px', height: '50px', backgroundColor: '#41535c'}}></div>
                                
                                <p>{question.questionStatus ? "답변 완료" : "답변 미완료"}</p>
                                
                                <div style={{width: '1px', height: '50px', backgroundColor: '#41535c'}}></div>
                                {questionAnswers.length > 0 ? (
                                    <ul>
                                        {questionAnswers.map((answer) => (
                                            <li style={{width: '500px'}} key={answer.answerId}>
                                                <p>답변: {answer.answerTitle}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{width: '500px'}}>답변이 없습니다.</p>
                                )}
                            </li>
                                </Link>
                        );
                    })}
                </ul>
            ) : (
                <p>등록된 질문이 없습니다.</p>
            )}

            <div className={ProductMoreCSS.product_paging} style={{padding: '50px 0 0 0'}}>
                {Array.isArray(questionsList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className=""
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num}
                    style={
                        currentPage === num
                            ? { backgroundColor: "#41535C" }
                            : null
                    }
                    onClick={() => setCurrentPage(num)}>
                        <button
                            style={
                                currentPage === num
                                    ? { color: "#fff", fontWeight: '500' }
                                    : null
                            }
                            className=""
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(questionsList) && (
                    <button
                        className=""
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === pageInfo.pageEnd ||
                            pageInfo.total == 0
                        }
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
}

export default AnswerList;