import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callLoginAPI } from "../../apis/UserApiCall";
import { Navigate } from "react-router-dom";
import { POST_SINGUP } from "../../modules/UserModule";
import SignupContainer from "../../components/signup/SignupContainer";
import UserCSS from "../../components/signup/UserPage.module.css"


function Login(props) {
	const navigate = useNavigate();

	/* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
	const dispatch = useDispatch();
	const loginUser = useSelector(state => state.userReducer); // API 요청하여 가져온 loginMember 정보

	/* 폼 데이터 한번에 변경 및 State에 저장 */
	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		if (loginUser.status === 200) {
			console.log("[Login] Login SUCCESS {}", loginUser);
			navigate("/", { replace: true });
		}
		if (loginUser.status === 201) {
			loginUser.status = 100; // Continue
			dispatch({ type: POST_SINGUP, payload: loginUser });
		}
	});

	const onChangeHandler = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const fetchLogin = () => {
		dispatch(callLoginAPI({ form: form }));
	};

	if (loginUser.length > 0) {
		console.log("[Login] Login is already authenticated by the server");
		return <Navigate to='/' />;
	}

    return (
        <SignupContainer>
            <div>
			<input className={UserCSS.signup_input}
				type='text'
				name='username'
				placeholder='아이디'
				autoComplete='off'
				onChange={onChangeHandler}
                />
                </div><div>
			<input className={UserCSS.signup_input}
				type='password'
				name='password'
				placeholder='패스워드'
				autoComplete='off'
				onChange={onChangeHandler}
                />
            </div>
            <div className={UserCSS.spacing}></div>
            
            <div>
                <button
                    className={UserCSS.signup_button_hilight}
                    onClick={fetchLogin}> 로그인</button>
            </div>
            <div>
            <button
                    className={UserCSS.signup_button_nomal}
                    onClick={() => { navigate("/signup", { replace: false })}}
                    > 회원가입</button>
            </div>
            <div><NavLink>아이디 찾기</NavLink> <NavLink>비밀번호 찾기</NavLink></div>
            </SignupContainer>
	);
}

export default Login;
