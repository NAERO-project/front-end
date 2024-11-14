import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { useSelector, useDispatch } from "react-redux";

function Header(props) {
	//필요헤더 -> 로그인 전, 로그인 후, 관리자 로그인 후

	// 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
	const dispatch = useDispatch();
	const loginUser = useSelector(state => state.userReducer); // 저장소에서 가져온 loginMember 정보
	const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인

	const [loginModal, setLoginModal] = useState(false);

	function commonHeader() {
		return <>기본 사용자 </>;
	}
	function BeforeLogin() {
		return (
			<>
				로그인 하지 않은 사용자
				<NavLink to='/login'>로그인</NavLink> | <NavLink to='/signup'>회원가입</NavLink>
			</>
		);
	}
	function AfterUserLogin() {
		return (
			<>
				{" "}
				로그인 한 사용자
				<NavLink to='/login'>장바구니</NavLink> | <NavLink to='/register'>알림</NavLink>
				<NavLink to='/register'>{loginUser.username}</NavLink>
			</>
		);
	}

	function AdminLogin() {
		return <>관리자에 추가되는 내용.. 이 있나? </>;
	}

	return (
		<div>
			{true
				? () => {
						commonHeader();
						AfterUserLogin();
				  }
				: AfterUserLogin}
			기본 헤더
			{}
		</div>
	);
}

export default Header;
