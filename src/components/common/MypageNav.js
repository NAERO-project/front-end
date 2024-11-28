import React from "react";
import { NavLink } from "react-router-dom";
import MypageNavCSS from "./MypageNav.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { Navigate } from "react-router-dom";

function MypageNav(props) {
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    if (
        token === undefined ||
        token === null
        || token.exp * 1000 < Date.now()
    ) {
        return <Navigate to="/" />;
    }

    return (
        <div>
			<div>
				<h2>마이페이지</h2>
			</div>
            <div className={MypageNavCSS.NavBar}>
                <ul>
                    <li>
                        <NavLink to="/mypage/order">결제 내역</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/detail">개인정보</NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/update">개인정보 수정</NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/">찜 리스트</NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/questions">1:1 문의</NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/">쿠폰 정보</NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/reviews/my-reviews">상품 후기</NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/inquirys">상품 문의</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MypageNav;
