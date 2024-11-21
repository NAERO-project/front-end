function UserInfoForm({ userDetail }) {
	return (
		<div>
			<h2>{userDetail.userFullName} 구매자님 안녕하세요 </h2>
			<div>주문자 정보</div>
			<p>이름 : {userDetail.userFullName}</p>
			<p>아이디 : {userDetail.username}</p>
			<p>이메일 : {userDetail.userEmail}</p>
			<p>휴대폰 : {userDetail.userPhone ? userDetail.userPhone : "등록하지 않음"}</p>
		</div>
	);
}

export default UserInfoForm;
