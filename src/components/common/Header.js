import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { useSelector, useDispatch } from "react-redux";
import { callLogoutAPI } from "../../apis/UserApiCall";

function Header(props) {
	//필요헤더 -> 로그인 전, 로그인 후, 관리자 로그인 후

	const navigate = useNavigate();

	// 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
	const dispatch = useDispatch();
	const loginUser = useSelector(state => state.userReducer); // 저장소에서 가져온 loginMember 정보
	const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
	// const username = decodeJwt(isLogin).sub;

	const [loginModal, setLoginModal] = useState(false);

	//로그아웃
	const onClickLogoutHandler = () => {
		window.localStorage.removeItem("accessToken");
		dispatch(callLogoutAPI());

		alert("로그아웃이 되어 메인화면으로 이동합니다.");
		navigate("/", { replace: true });
		window.location.reload();
	};

	function commonHeader() {
		//네비바가 될 듯함
		return <>기본 헤더 </>;
	}
	function BeforeLogin() {
		return (
			<>
				{commonHeader()}
				로그인 하지 않은 사용자
				<NavLink to='/login'>로그인</NavLink> | <NavLink to='/signup'>회원가입</NavLink>
			</>
		);
	}
	function AfterUserLogin() {
		// const username = loginUser.;
		console.log("로그인 유저", loginUser);
		let userFullname = window.localStorage.getItem("userFullName");
		const isProducer = decodeJwt(isLogin).auth.some(a => /ROLE_PRODUCER/.test(a));
		const isAdmin = decodeJwt(isLogin).auth.some(a => /ROLE_.*_ADMIN/.test(a));

		console.log(isAdmin);
		if (isAdmin) {
			return AdminLogin();
		}
		return (
			<>
				{commonHeader()}
				{isProducer && <NavLink to='/producer/product-manage'>판매자 매장관리</NavLink>} |
				<NavLink to='/mypage/detail'>{userFullname}님</NavLink> |{" "}
				<NavLink to='/login'>장바구니</NavLink> | <NavLink to='/register'>알림</NavLink>
				<button onClick={onClickLogoutHandler}>로그아웃</button>
			</>
		);
	}

	function AdminLogin() {
		return (
			<>
				관리자헤더
				<button onClick={onClickLogoutHandler}>로그아웃</button>
			</>
		);
	}

	// 아래 조건 위치 (boolean위치) 에 들어가야할 값 :로그인 여부, role 확인,
	return <div>{!isLogin ? BeforeLogin() : AfterUserLogin()}</div>;
}

export default Header;
