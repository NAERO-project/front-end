import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callWithdrawAPI, callLogoutAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";
function WithdrawButton(props) {
	const { url, comment } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(url, comment);
	const success = useSelector(state => state.userReducer);
	const username = decodeJwt(window.localStorage.getItem("accessToken")).sub; // Local Storage 에 token 정보 확인

	useEffect(() => {
		console.log(success);
		if (success && success.status === 202) {
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
		<div>
			<button onClick={fetchWithdraw}>회원 탈퇴 버튼 테스트</button>
		</div>
	);
}

export default WithdrawButton;