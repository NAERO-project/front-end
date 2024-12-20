import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MypageNavCSS from "./MypageNav.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { Navigate } from "react-router-dom";

import { callUserDetailAPI } from "../../apis/UserApiCall";
import Footer from "./Footer";

function isTokenExpired(decodedToken) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

function MypageNav(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    
    const loginUser = useSelector((state) => state.userReducer.data || {});
    const isLogin = window.localStorage.getItem("accessToken");
    const decodedToken = decodeJwt(isLogin);
    const isProducer = decodeJwt(isLogin).auth.some((a) =>
        /ROLE_PRODUCER/.test(a)
    );
    const username = decodeJwt(isLogin).sub;
    const userDetail = isProducer ? loginUser.user : loginUser;

    // const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출
    const userFullname = window.localStorage.getItem("userFullName");

    // const userDetail = useSelector((state) => state.userReducer.data || {});

    useEffect(() => {
        if (!isLogin || !decodedToken || isTokenExpired(decodedToken)) {
            alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
            navigate("/login");
            return;
        }

        dispatch(
            callUserDetailAPI({
                username: username,
            })
        );
    }, [username]);

    if (
        token === undefined ||
        token === null ||
        token.exp * 1000 < Date.now()
    ) {
        return <Navigate to="/" />;
    }

    return (
        <div className={MypageNavCSS.box}>
            <div className={MypageNavCSS.my_txt}>
                <h2>마이페이지</h2>
            </div>

            <div className={MypageNavCSS.my_hi}>
                <div className={MypageNavCSS.my_name}>
                    <h3>{userFullname}님 안녕하세요</h3>
                </div>
                <div>
                    <h4>환경 기여 포인트: <br/>{userDetail?.userPoint?.toLocaleString()}원</h4>
                </div>
            </div>
            
            <div className={MypageNavCSS.NavBar}>
                    <ul>
                        <li>
                            <NavLink to="/mypage/order" className={MypageNavCSS.NavBar_txt}>결제 내역</NavLink>
                        </li>
                        <li>
                            <NavLink to="/mypage/detail" className={MypageNavCSS.NavBar_txt}>개인정보</NavLink>
                        </li>

                        <li>
                            <NavLink to="/mypage/update" className={MypageNavCSS.NavBar_txt}>개인정보 수정</NavLink>
                        </li>

                        {/* <li>
                            <NavLink to="/mypage/" className={MypageNavCSS.NavBar_txt}>찜 리스트</NavLink>
                        </li> */}

                        <li>
                            <NavLink to="/mypage/questions" className={MypageNavCSS.NavBar_txt}>1:1 문의</NavLink>
                        </li>

                        {/* <li>
                            <NavLink to="/mypage/" className={MypageNavCSS.NavBar_txt}>쿠폰 정보</NavLink>
                        </li>

                        <li>
                            <NavLink to="/mypage/" className={MypageNavCSS.NavBar_txt}>상품 후기</NavLink>
                        </li> */}
                    </ul>
                </div>
        </div>
    );
}

export default MypageNav;
