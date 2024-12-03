import React, { useEffect, useRef, useState } from "react";
import UserCSS from "./UserPage.module.css";
import { LuCheck } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { callEmailSendAPI, callIdDuplCheckAPI, callSendAuthKeyAPI } from "../../apis/AuthApiCall";

function SignupForm(props) {
	const {
		form,
		setForm,
		isChecked,
		checkPassword,
		authId,
		setAuthId,
		setIsChekedEmail,
		isCheckedId,
		setIsCheckedId,
	} = props;
	const [passwordCheck, setPasswordCheck] = useState("");
	const [intervalId, setIntervalId] = useState(null); // 실행 중인 타이머 ID 저장
	const [endTime, setEndTime] = useState("");
	const [authProcess, setAuthProcess] = useState(false);
	const [authKey, setAuthKey] = useState("");
	const auth = useSelector(state => state.authReducer);
	const dispatch = useDispatch();
	const emailButton = useRef();
	const emailInput = useRef();
	const authKeyButton = useRef();

	const onChangeHandler = e => {
		console.log(form);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const emailSend = () => {
		dispatch(callEmailSendAPI({ email: form.userEmail }));
	};
	const sendAuthKey = () => {
		console.log("인증키", authKey);
		dispatch(callSendAuthKeyAPI(authId, authKey));
	};

	const sendEmail = ({ authId, endTime }) => {
		setAuthId(authId);
		setEndTime(endTime);
		if (emailButton.current) {
			emailButton.current.innerText = "재전송";
		}
		if (authKeyButton.current) {
			authKeyButton.current.style.disabled = false;
			authKeyButton.current.style.backgroundColor = "#7B9064";
		}
		const newIntervalId = setInterval(() => timer(endTime), 1000);
		setIntervalId(newIntervalId);
	};

	const checkIdDupl = () => {
		dispatch(callIdDuplCheckAPI(form.username));
	};

	const authSuccess = () => {
		clearInterval(intervalId); // 타이머 중단
		authKeyButton.current.innerText = "인증 성공";
		authKeyButton.current.style.disabled = true;
		emailInput.current.readOnly = true;
		setIntervalId(null);
		setIsChekedEmail(true);
	};

	const timer = endTime => {
		const now = new Date();
		const end = new Date(endTime);
		const timeDifference = Math.max(0, Math.floor((end - now) / 1000));
		const time = `(${Math.floor(timeDifference / 60)}:${timeDifference % 60})`;

		if (authKeyButton.current) {
			if (timeDifference > 0) {
				authKeyButton.current.innerText = "인증" + time;
			} else {
				authKeyButton.current.innerText = "인증 만료";
				authKeyButton.current.style.disabled = true;
				authKeyButton.current.style.backgroundColor = "gray";
				if (intervalId) {
					clearInterval(intervalId); // 타이머 중단
					setIntervalId(null);
				}
			}
		}
	};

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
			}
		};
	}, [intervalId]);

	useEffect(() => {
		if (auth.status === 202) {
			setAuthProcess(true);
			sendEmail(auth.data);
		} else if (auth.status === 203) {
			authSuccess();
		} else if (auth.status === 204) {
			setIsCheckedId(true);
		}
	}, [auth]);

	useEffect(() => {
		if (passwordCheck === form.password) {
			checkPassword(true);
		} else {
			checkPassword(false);
		}
	}, [passwordCheck, form.password]);

	const keyChangeHandler = e => {
		const value = e.target.value.slice(0, 6).toUpperCase();
		console.log(value);
		e.target.value = value;
		setAuthKey(e.target.value);
	};

	return (
		<form className={UserCSS.input_container}>
			<table className={UserCSS.signup_table}>
				<colgroup>
					<col style={{ width: "60%" }} />
					<col style={{ width: "10%" }} />
					<col style={{ width: "30%" }} />
				</colgroup>

				<tr>
					<td className={UserCSS.signip_table_td}>
						<input
							className={UserCSS.signup_table_input}
							type='text'
							name='username'
							placeholder='아이디*'
							autoComplete='off'
							onChange={onChangeHandler}
							required
						/>
					</td>
					<td className={UserCSS.signip_table_td}>{isCheckedId ? <LuCheck /> : null}</td>
					<td className={UserCSS.signip_table_td}>
						<button
							onClick={checkIdDupl}
							className={UserCSS.check_button}
							type='button'
						>
							중복 확인
						</button>
					</td>
				</tr>
				<tr>
					<td colspan='3' className={UserCSS.signip_table_td}>
						<input
							className={UserCSS.signup_table_input}
							type='password'
							name='password'
							placeholder='비밀번호*'
							autoComplete='off'
							onChange={onChangeHandler}
							required
						/>
					</td>
				</tr>
				<tr>
					<td className={UserCSS.signip_table_td}>
						<input
							className={UserCSS.signup_table_input}
							type='password'
							name='passwordCheck'
							placeholder='비밀번호 확인*'
							autoComplete='off'
							onChange={e => setPasswordCheck(e.target.value)}
							required
						/>
					</td>
					<td className={UserCSS.signip_table_td}></td>
					<td className={UserCSS.signip_table_td}>
						{form.password && passwordCheck && (isChecked ? <LuCheck /> : <LuX />)}
					</td>
				</tr>
			</table>
			<table className={UserCSS.signup_table}>
				<colgroup>
					<col style={{ width: "70%" }} />
					<col style={{ width: "30%" }} />
				</colgroup>

				<tr>
					<td colspan='2' className={UserCSS.signip_table_td}>
						<input
							className={UserCSS.signup_table_input}
							type='text'
							name='userFullName'
							placeholder='이름*'
							autoComplete='off'
							onChange={onChangeHandler}
						/>
					</td>
				</tr>
				<tr>
					<td colspan='2' className={UserCSS.signip_table_td}>
						<input
							className={UserCSS.signup_table_input}
							type='text'
							name='userPhone'
							placeholder='연락처'
							autoComplete='off'
							onChange={onChangeHandler}
						/>
					</td>
				</tr>
				<tr>
					<td className={UserCSS.signip_table_td}>
						<input
							className={UserCSS.signup_table_input}
							type='text'
							name='userEmail'
							placeholder='이메일*'
							autoComplete='off'
							onChange={onChangeHandler}
							ref={emailInput}
							required
						/>
					</td>
					<td className={UserCSS.signip_table_td}>
						<button
							onClick={emailSend}
							ref={emailButton}
							className={authProcess ? UserCSS.check_button3 : UserCSS.check_button2}
							type='button'
						>
							인증번호 전송
						</button>
					</td>
				</tr>
				{authProcess && (
					<tr>
						<td className={UserCSS.signip_table_td}>
							<input
								maxLength={6}
								className={UserCSS.signup_table_input}
								limit
								type='text'
								placeholder='인증 번호*'
								autoComplete='off'
								onChange={keyChangeHandler}
								required
							/>
						</td>
						<td className={UserCSS.signip_table_td}>
							<button
								onClick={sendAuthKey}
								ref={authKeyButton}
								className={UserCSS.check_button2}
								type='button'
							>
								인증
							</button>
						</td>
					</tr>
				)}
			</table>
		</form>
	);
}

export default SignupForm;
