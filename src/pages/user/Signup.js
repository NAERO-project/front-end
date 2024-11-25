import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callSignupAPI } from "../../apis/UserApiCall";
import SignupContainer from "../../components/signup/SignupContainer";

function Signup(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const success = useSelector(state => state.userReducer);
	const [passwordCheck, setPasswordCheck] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const email = useRef();
	const [form, setForm] = useState({
		username: "",
		password: "",
		userFullName: "",
		userEmail: "",
		userPhone: "",
	});
	useEffect(() => {
		if (passwordCheck === form.password) {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [passwordCheck, form.password]);

	useEffect(() => {
		console.log("effet호출");
		if (success && success.status === 201) {
			alert("회원가입 성공");
			navigate("/login", { replace: true });
		}
	}, [success]);

	const fetchSignup = e => {
		e.preventDefault();
		if (isChecked) {
			dispatch(callSignupAPI({ form: form }));
		} else {
			alert("비밀번호가 일치하지 않습니다.");
		}
	};

	const onChangeHandler = e => {
		console.log(form);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const prevBtn = () => {};
	const signipStep1 = () => {
		return <>이용 약관 </>;
	};

	const signupStep2 = () => {
		return (
			<form>
				<input
					type='text'
					name='username'
					placeholder='아이디'
					autoComplete='off'
					onChange={onChangeHandler}
					required
				/>
				<button type='button'>아이디 중복 확인</button>
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
				<input
					type='text'
					name='userPhone'
					placeholder='연락처'
					autoComplete='off'
					onChange={onChangeHandler}
				/>

				{form.password && passwordCheck && (isChecked ? <> 일치</> : <>불일치</>)}
				<input
					type='text'
					name='userFullName'
					placeholder='이름'
					autoComplete='off'
					onChange={onChangeHandler}
				/>
				<input
					type='text'
					name='userEmail'
					placeholder='이메일'
					autoComplete='off'
					onChange={onChangeHandler}
					reff
				/>
				{/* <button> 이메일 중복 확인 및 인증 </button> */}
				<button type='button' onClick={prevBtn}>
					이전
				</button>
				<button onClick={fetchSignup}>회원 가입</button>
			</form>
		);
	};

	return (
		<>
			<SignupContainer>회원가입 페이지 {signupStep2(onChangeHandler)} </SignupContainer>
		</>
	);
}

export default Signup;

//각 스텝 완성 후  가능하다면분리작업을 해야 될 듯. 번잡스러움
