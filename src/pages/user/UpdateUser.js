import React, { useEffect, useState } from "react";
import PasswordCheck from "../../components/signup/PasswordCheck";
import WithdrawButton from "../../components/signup/WithdrawButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callUpdateUserAPI } from "../../apis/UserApiCall";

//유저 정보수정엔 단순 정보 수정 외에 비밀번호 수정도 필요함
function UpdateUser(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isAuthed, setIsAuthed] = useState(false);

	const [passwordCheck, setPasswordCheck] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [form, setForm] = useState({
		password: "",
		userFullName: "",
		userPhone: "",
	});

	const onChangeHandler = e => {
		console.log(form);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		if (passwordCheck === form.password) {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [passwordCheck, form.password]);

	const fetchUpdate = e => {
		e.preventDefault();
		window.confirm("입력하신 정보로 수정됩니다.");

		dispatch(callUpdateUserAPI({ form: form }));
	};

	const updateFrom = () => {
		return (
			<form>
				<h2> 수정할 정보만 입력해주세요 </h2>
				<input
					type='text'
					name='userFullName'
					placeholder='이름'
					autoComplete='off'
					onChange={onChangeHandler}
				/>
				<input
					type='password'
					name='password'
					placeholder='패스워드'
					autoComplete='off'
					onChange={onChangeHandler}
					required
				/>
				<input
					type='password'
					name='passwordCheck'
					placeholder='비밀번호확인'
					autoComplete='off'
					onChange={e => {
						setPasswordCheck(e.target.value);
					}}
					required
				/>
				{form.password && passwordCheck && (isAuthed ? <> 일치</> : <>불일치</>)}
				<input
					type='text'
					name='userPhone'
					placeholder='연락처'
					autoComplete='off'
					onChange={onChangeHandler}
				/>
				<button onClick={fetchUpdate}>수정 요청</button> <WithdrawButton />
			</form>
		);
	};

	return <div>{!isAuthed ? <PasswordCheck setstate={setIsAuthed} /> : updateFrom()}</div>;
}

export default UpdateUser;
