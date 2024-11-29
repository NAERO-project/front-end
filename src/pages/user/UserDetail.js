import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callUserDetailAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";
import UserInfoForm from "../../components/signup/UserInfoForm";
import { NavLink } from "react-router-dom";

import UserDetailCSS from "./css/UserDetail.module.css"

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

    console.log(loginUser, isProducer)
	return (
		<div  className={UserDetailCSS.box} style={{ color: "black" }}>
			<div className={UserDetailCSS.user}>
				<h3>
					주문자 정보
				</h3>
			</div>
			{user && (
				<div>
					<UserInfoForm user={user}></UserInfoForm>
				</div>
			)}
			{/* <hr className={UserDetailCSS.line} style={{ border: "1px solid black" }}></hr> */}
			{/* <div className={UserDetailCSS.user}>
				<h3>
					배송지 정보
				</h3>
			</div>
			{!isProducer ? <NavLink to='/mypage/toproducer'>사업자 신청</NavLink> : null} */}
		</div>
	);
}

export default UserDetail;
