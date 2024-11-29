import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callSignupAPI } from "../../apis/UserApiCall";
import SignupContainer from "../../components/signup/SignupContainer";
import UserCSS from "../../components/signup/UserPage.module.css"

function Signup(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const success = useSelector(state => state.userReducer);
	const auth = useSelector(state => state.authReducer);
	const [passwordCheck, setPasswordCheck] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedId, setIsCheckedId] = useState(false);
    const [isChekedEmail, setIsChekedEmail] = useState({
        authId: 0,
        authSuccess:false
    })
    const [checkConst, setCheckConst] = useState(false)
    
    useEffect(() => {
        setCheckConst(isChecked && isCheckedId && isChekedEmail)
    },
        [isChecked, isCheckedId, isChekedEmail])

    useEffect(() => { },[])

    const email = useRef();
    
    const emailSend = () => { 
        
    }

    const changeButton = () => { 

    }

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
        if (!isCheckedId) {
            alert("아이디 중복확인이 필요합니다.");
        }
        else if (!isChecked) {
            alert("비밀번호가 일치하지 않습니다.");
        }
        else if (!isChekedEmail) {
            alert("이메일 인증 후 회원가입이 가능합니다.");
        }
        else if (checkConst) { 
			dispatch(callSignupAPI({ form: form }));

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
            <form
            className={UserCSS.input_container}
            >
                <table className={UserCSS.signup_table}>

            <colgroup>
            <col style={{width:"70%"}}/> 
            <col style={{width:"30%"}}/> 
            </colgroup>
                            
    <tr >
        <td className={UserCSS.signip_table_td}>
                            <input
                                className={UserCSS.signup_table_input}
                type="text"
                name="username"
                placeholder="아이디*"
                autoComplete="off"
                onChange={onChangeHandler}
                required
            />
        </td>
        <td  className={UserCSS.signip_table_td}>
                            <button
                                className={UserCSS.check_button}
                                type="button">중복 확인</button>
        </td>
    </tr>
    <tr>
        <td colspan="2" className={UserCSS.signip_table_td}>
                            <input
                                className={UserCSS.signup_table_input}
                type="password"
                name="password"
                placeholder="비밀번호*"
                autoComplete="off"
                onChange={onChangeHandler}
                required
            />
        </td>
    </tr>
    <tr>
        <td   className={UserCSS.signip_table_td}>
                            <input
                                className={UserCSS.signup_table_input}
                type="password"
                name="passwordCheck"
                placeholder="비밀번호 확인*"
                autoComplete="off"
                onChange={e => setPasswordCheck(e.target.value)}
                required
            />
                        </td>
                        <td className={UserCSS.signip_table_td}>
				{form.password && passwordCheck && (isChecked ? <> O</> : <>X</>)}

                        </td>
    </tr>
                </table>
                <table className={UserCSS.signup_table}>

                <colgroup>
            <col style={{width:"70%"}}/> 
            <col style={{width:"30%"}}/> 
                    </colgroup>
                    
                    <tr >
                        <td  colspan="2" className={UserCSS.signip_table_td}>
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
                <td  colspan="2" className={UserCSS.signip_table_td}>
                            <input
                                className={UserCSS.signup_table_input}
                                
					type='text'
					name='userPhone'
					placeholder='연락처'
					autoComplete='off'
					onChange={onChangeHandler}
				/>
                            </td >
                    </tr>    
                    <tr>
                    <td  className={UserCSS.signip_table_td}>

                            <input
                                className={UserCSS.signup_table_input}
                                
                                
					type='text'
					name='userEmail'
					placeholder='이메일*'
					autoComplete='off'
					onChange={onChangeHandler}
                    required
                            />
                        </td>
                        <td  className={UserCSS.signip_table_td}>
                            <button
                                onClick={emailSend }
                                ref={ email }
                                className={UserCSS.check_button2}
                                type="button">인증번호 전송</button>
                        </td>
                        </tr>
                    </table>
				{/* <button> 이메일 중복 확인 및 인증 </button> */}
				{/* <button type='button' onClick={prevBtn}>
					이전
				</button> */}
                <button
                    className={UserCSS.signup_button_hilight}
                    
                    onClick={fetchSignup}>회원 가입</button>
			</form>
		);
	};

	return (
		<>
			<SignupContainer> {signupStep2(onChangeHandler)} </SignupContainer>
		</>
	);
}

export default Signup;

//각 스텝 완성 후  가능하다면분리작업을 해야 될 듯. 번잡스러움
