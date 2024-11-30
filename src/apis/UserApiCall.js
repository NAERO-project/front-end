// 인증, 권한의 식별이 필요한 APICALL에는 window.localStorage.getItem("accessToken")
// redux 에 있는 State 중 accessToken 을 가져와서 사용함
//그러니까... 우리는 단순한 상품 조회외의 대부분의 API에서 이를 사용해야함
import { type } from "@testing-library/user-event/dist/type";
import {
	GET_USER,
	POST_LOGIN,
	POST_SINGUP,
	UPDATE_USER,
	WITHDRAWAL_USER,
} from "../modules/UserModule";
import { GET_PASS_CHECK } from "../modules/AuthModule";
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
			console.log(result.data.userFullName);
			window.localStorage.setItem("accessToken", result.data.accessToken);
			window.localStorage.setItem("userFullName", result.data.userFullName);
		} else if (result.status === 400) {
			alert(result.message); // 로그인 실패 시 메시지를 alert로 표시
		}
		dispatch({ type: POST_LOGIN, payload: result });
	};
};

//서버 요청 없이 로컬 인증정보를 삭제하는 방식의 로그아웃
export const callLogoutAPI = () => {
	console.log("로그아웃 요청");
	return async (dispatch, getState) => {
		dispatch({ type: POST_LOGIN, payload: "" });
		window.localStorage.removeItem("accessToken");
		window.localStorage.removeItem("userFullName");
		console.log("[UserApiCall] callLogoutAPI RESULT : SUCCESS");
	};
};

export const callSignupAPI = ({ form,authId }) => {
	const requestURL = `${prefix}/auth/signup/${authId}`;

	console.log(form);
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
			},
			body: JSON.stringify({
				username: form.username,
				password: form.password,
				userFullName: form.userFullName,
				userEmail: form.userEmail,
				userPhone: form.userPhone,
			}),
		}).then(response => response.json());

		console.log("[UserAPICalls] callRegisterAPI RESULT : ", result);

		if (result.status === 201) {
			dispatch({ type: POST_SINGUP, payload: result });
		} else {
			alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
		}
	};
};

export const callWithdrawAPI = ({ username, url }) => {
	const requestURL = `${prefix}/api${url}/${username}`;
	console.log(requestURL);

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
			},
		}).then(response => response.json());

		console.log(result);
		if (result.status === 202) {
			dispatch({ type: WITHDRAWAL_USER, payload: result });
		} else {
			alert("회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요");
		}
	};
};

export const callUserDetailAPI = ({ username }) => {
    const requestURL = `${prefix}/api/user/detail/${username}`;
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
			},
		}).then(response => response.json());

		console.log(result);
        if (result.status === 200) {
            result.status = 203
			dispatch({ type: GET_USER, payload: result });
		} else {
			alert("회원정보를 가져오는데에 실패했습니다. 다시 시도해주세요");
		}
	};
};
export const callUpdateUserAPI = ({ form }) => {
	const requestURL = `${prefix}/api/user/update`;
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
			},
			body: JSON.stringify(form),
		}).then(response => response.json());

		console.log("callUpdateUserAPI",result);
        if (result.status === 200) {
            result.status = 204
            dispatch({ type: UPDATE_USER, payload: result });
		} else {
			alert("회원정보를 수정하는데에 실패했습니다. 다시 시도해주세요");
		}
	};
};
export const callUpdateProducerAPI = ({ form }) => {
	const requestURL = `${prefix}/api/user/update/producer`;
	console.log(form);
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
			},
			body: JSON.stringify(form),
		});

		console.log(result);
        if (result.status === 200) {
            result.status = 204
            dispatch({ type: UPDATE_USER, payload: result });
		} else {
			alert("판매자정보를 수정하는데에 실패했습니다. 다시 시도해주세요");
		}
	};
};
