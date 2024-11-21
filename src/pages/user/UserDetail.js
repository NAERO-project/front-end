import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callUserDetailAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";
import WithdrawButton from "../../components/signup/WithdrawButton";
import UserInfoForm from "../../components/signup/UserInfoForm";
import { NavLink } from "react-router-dom";

function UserDetail(props) {
	const dispatch = useDispatch();
	const loginUser = useSelector(state => state.userReducer.data || {});
	const isLogin = window.localStorage.getItem("accessToken");
	const isProducer = decodeJwt(isLogin).auth.some(a => /ROLE_PRODUCER/.test(a));
	const username = decodeJwt(isLogin).sub;
	const user = isProducer ? loginUser.user : loginUser;

	useEffect(() => {
		dispatch(callUserDetailAPI({ username: username }));
	}, []);

	return (
		<div style={{ color: "black" }}>
			<h2>{user.userFullName} 님 안녕하세요 </h2>
			{user && <UserInfoForm user={user}></UserInfoForm>}
			<hr style={{ border: "1px solid black" }}></hr>
			배송지 정보
			{!isProducer ? <NavLink to='/'>사업자 신청</NavLink> : null}
			<WithdrawButton />
		</div>
	);
}

export default UserDetail;
