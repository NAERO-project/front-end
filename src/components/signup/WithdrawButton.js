import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callWithdrawAPI, callLogoutAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";

import WithdrawBtnCSS from "./css/WithdrawBtn.module.css";
// import ProducerUpdateCSS from "./css/";

function WithdrawButton(props) {
    const { url, comment, ...etc } = props;
    const isLogin = decodeJwt(window.localStorage.getItem("accessToken"));
    const isAdmin = isLogin.auth.some(a => /ROLE_.*_ADMIN/.test(a));
    const username = etc?.username || isLogin?.sub || undefined
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const success = useSelector(state => state.userReducer);

    console.log(username)
	useEffect(() => {
        console.log(success);
        if (success && success.status === 202 && isAdmin) { 
            alert(`${comment}에 성공했습니다. 이전화면으로 돌아갑니다.`);
            navigate(-2);
        }
		else if (success && success.status === 202) {
			window.localStorage.removeItem("accessToken");
			dispatch(callLogoutAPI());
			alert(`${comment}에 성공했습니다. 자동 로그아웃 됩니다.`);
			navigate("/", { replace: true });
		}
	}, [success]);

	const fetchWithdraw = () => {
		if (
			window.confirm(
				`확인 버튼을 누르시면 ${comment}가 진행되며, 복구가 불가능합니다. 또한 바로 로그아웃됩니다. 진행하시겠습니까?`
			)
		) {
			dispatch(callWithdrawAPI({ url: url, username: username }));
		}
	};
	return (
		// <div className={`${WithdrawBtnCSS.btn_box} ${ProducerUpdateCSS.btn2}`}>
		<div className={`${WithdrawBtnCSS.btn_box}`}>
		<button onClick={fetchWithdraw}>회원 탈퇴</button>
		</div>
	);
}

export default WithdrawButton;
