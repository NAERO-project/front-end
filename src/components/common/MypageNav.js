import React from "react";
import { NavLink } from "react-router-dom";
import MypageNavCSS from "./MypageNav.module.css";

function MypageNav(props) {
	return (
		<div className={MypageNavCSS.NavBar}>
			<NavLink to='/mypage/'>결제 내역</NavLink>
			<NavLink to='/mypage/detail'>개인정보</NavLink>
			<NavLink to='/mypage/update'>개인정보 수정</NavLink>
			<NavLink to='/mypage/'>찜 리스트</NavLink>
			<NavLink to='/mypage/'>1:1 문의</NavLink>
			<NavLink to='/mypage/'>쿠폰 정보</NavLink>
			<NavLink to='/mypage/'>상품 후기</NavLink>
			<NavLink to='/mypage/'>상품 후기</NavLink>
		</div>
	);
}

export default MypageNav;
