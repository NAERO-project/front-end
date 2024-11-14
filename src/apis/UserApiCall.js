// 인증, 권한의 식별이 필요한 APICALL에는 window.localStorage.getItem("accessToken")
// redux 에 있는 State 중 accessToken 을 가져와서 사용함
//그러니까... 우리는 단순한 상품 조회외의 대부분의 API에서 이를 사용해야함
import { GET_USER, POST_LOGIN, POST_SINGUP } from "../modules/UserModule";
const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callLoginAPI = ({ form }) => {
	const requestURL = `${prefix}/auth/signin`;

	console.log("확인");
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				username: form.username,
				password: form.password,
			}),
		}).then(response => response.json());

		console.log("[UserApiCall] callLoginAPI RESULT : ", result);
		if (result.status === 200) {
			window.localStorage.setItem("accessToken", result.data.accessToken);
		} else if (result.status === 400) {
			alert(result.message); // 로그인 실패 시 메시지를 alert로 표시
		}
		dispatch({ type: POST_LOGIN, payload: result });
	};
};

//서버 요청 없이 로컬 인증정보를 삭제하는 방식의 로그아웃
export const callLogoutAPI = () => {
	return async (dispatch, getState) => {
		dispatch({ type: POST_LOGIN, payload: "" });
		console.log("[UserApiCall] callLogoutAPI RESULT : SUCCESS");
	};
};
