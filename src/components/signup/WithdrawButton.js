import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callWithdrawAPI, callLogoutAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";
function WithdrawButton(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const success = useSelector(state => state.userReducer);
	const username = decodeJwt(window.localStorage.getItem("accessToken")).sub; // Local Storage 에 token 정보 확인

	useEffect(() => {
		console.log(success);
		if (success && success.status === 202) {
			console.log("status 가 202입니다");
			alert("회원 탈퇴에 성공했습니다. 자동 로그아웃 됩니다.");
			callLogoutAPI();
			navigate("/", { replace: true });
		}
	}, [success]);

	const fetchWithdraw = () => {
		dispatch(callWithdrawAPI({ username: username }));
	};
	return (
		<div>
			<button onClick={fetchWithdraw}>회원 탈퇴 버튼 테스트</button>
		</div>
	);
}

export default WithdrawButton;
