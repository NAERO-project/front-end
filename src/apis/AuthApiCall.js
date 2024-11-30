import { GET_DUPLI_ID, GET_PASS_CHECK, GET_SEND_EMAIL } from "../modules/AuthModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callPasswordCheck = ({ password }) => {
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


export const callEmailSendAPI = ({  email }) => {
    const requestURL = `${prefix}/auth/email/send/${email}`;
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
			},
		}).then(response => response.json());

		console.log(result);
        if (result.status === 202) {
			dispatch({ type: GET_SEND_EMAIL, payload: result });
		} else {
			alert("인증번호 전송에 실패했습니다. 다시시도해주세요.")
		}
	};
};

export const callSendAuthKeyAPI = (  authId, authKey ) => {
    const requestURL = `${prefix}/auth/email/check`;
	return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
            body: JSON.stringify({
                authId: authId,
                authKey:authKey
            })
		}).then(response => response.json());
		console.log(result);
        if (result.status === 200) {
            result.status = 203
			dispatch({ type: GET_SEND_EMAIL, payload: result });
		} else {
            alert(result.message);
		}
	};
};
export const callIdDuplCheckAPI = (  id ) => {
    const requestURL = `${prefix}/auth/dupul/id/${id}`;
	return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            }
		}).then(response => response.json());
		console.log(result);
        if (result.status === 200) {
            result.status = 204
			dispatch({ type: GET_DUPLI_ID, payload: result });
		} else {
            alert(result.message);
		}
	};
};
