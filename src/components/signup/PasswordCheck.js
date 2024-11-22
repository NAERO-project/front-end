import React, { useEffect } from "react";
import { callPasswordCheck } from "../../apis/AuthApiCall";
import { useSelector } from "react-redux";

function PasswordCheck({ setstate }) {
	const checkFetch = useSelector(state => state.authReducer);

	useEffect(() => {
		if (checkFetch.status === 200) {
			setstate(true);
		}
	}, [checkFetch]);

	const clickBtn = () => {
		callPasswordCheck();
	};

	return (
		<div>
			<button
				onClick={() => {
					setstate(true);
				}}
			>
				비밀번호 인증
			</button>
		</div>
	);
}

export default PasswordCheck;
