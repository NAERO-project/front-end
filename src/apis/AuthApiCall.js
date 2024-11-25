import { GET_PASS_CHECK } from "../modules/AuthModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callPasswordCheck = ({ password }) => {
	console.log(password);
	const requestURL = `${prefix}/api/user/passcheck`;
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
			},
			body: password,
		}).then(response => response.json());

		console.log(result);
		if (result.status === 200) {
			dispatch({ type: GET_PASS_CHECK, payload: result });
		} else {
			alert("비밀번호 인증에 실패했습니다. 다시시도해주세요");
		}
	};
};
