import { NavLink } from "react-router-dom";

function UserInfoForm({ user }) {
	return (
		<div>
			<p>이름 : {user.userFullName}</p>

			<p>아이디 : {user.username}</p>
			<p>이메일 : {user.userEmail}</p>
			<p>휴대폰 : {user.userPhone ? user.userPhone : "등록하지 않음"}</p>
		</div>
	);
}

export default UserInfoForm;
