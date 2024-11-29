import { NavLink } from "react-router-dom";

import UserInfoCSS from "./css/UserInfoForm.module.css";

function UserInfoForm({ user }) {
    console.log(user)
	return (
		<div>
			<div className={UserInfoCSS.info}>
				<p>이름 : </p>
				<div className={UserInfoCSS.txt}><p> {user.userFullName}</p></div>
				
			</div>

			<div className={UserInfoCSS.info}>
				<p>아이디 : </p>
				<div className={UserInfoCSS.txt}> <p> {user.username}</p></div>
				
			</div>

			<div className={UserInfoCSS.info}>
				<p>이메일 : </p>
				<div className={UserInfoCSS.txt}><p> {user.userEmail}</p></div>
				
			</div>

			<div className={UserInfoCSS.info}>
				<p>휴대폰 : </p>
				<div className={UserInfoCSS.txt}><p> {user.userPhone ? user.userPhone : "등록하지 않음"}</p></div>
			</div>
		</div>
	);
}

export default UserInfoForm;
