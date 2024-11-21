import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callUserDetailAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";
import WithdrawButton from "../../components/signup/WithdrawButton";
import UserInfoForm from "../../components/signup/UserInfoForm";

function UserDetail(props) {
	const dispatch = useDispatch();
	const loginUser = useSelector(state => state.userReducer.data || {});
	const user = loginUser.user ? loginUser.user : loginUser;

	const username = decodeJwt(window.localStorage.getItem("accessToken")).sub;

	useEffect(() => {
		dispatch(callUserDetailAPI({ username: username }));
	}, []);

	console.log("유저 정보", loginUser);
	return (
		<div style={{ color: "black" }}>
			{user && <UserInfoForm userDetail={user}></UserInfoForm>}
			<WithdrawButton />
		</div>
	);
}

export default UserDetail;
