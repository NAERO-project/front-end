import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callSignupAPI } from "../../apis/UserApiCall";
import SignupContainer from "../../components/signup/SignupContainer";
import UserCSS from "../../components/signup/UserPage.module.css"
import SignupForm from "../../components/signup/SignupForm";

function Signup(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const success = useSelector(state => state.userReducer);
    const [isCheckedId, setIsCheckedId] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [checkConst, setCheckConst] = useState(false)
    const [authId, setAuthId] = useState(0);
    const [isChekedEmail, setIsChekedEmail] = useState({
        authId: 0,
        authSuccess:false
    })

    const [form, setForm] = useState({
		username: "",
		password: "",
		userFullName: "",
		userEmail: "",
        userPhone: "",
	});

    
    useEffect(() => {
        setCheckConst(isChecked && isCheckedId && isChekedEmail)
    },
        [isChecked, isCheckedId, isChekedEmail])

    useEffect(() => { 
        setIsCheckedId(false)
    },[form.username])


	useEffect(() => {
		console.log("effet호출");
		if (success && success.status === 201) {
			alert("회원가입 성공");
			navigate("/login", { replace: true });
		}
	}, [success]);

	const fetchSignup = e => {
        e.preventDefault();
        if (checkConst) { 
			dispatch(callSignupAPI({ form: form, authId:authId }));
        }
        else if (!isCheckedId) {
            alert("아이디 중복확인이 필요합니다.");
        }
        else if (!isChecked) {
            alert("비밀번호가 일치하지 않습니다.");
        }
        else if (!isChekedEmail) {
            alert("이메일 인증 후 회원가입이 가능합니다.");
        }
	};

	const signipStep1 = () => {
		return <>이용 약관 </>;
	};


	return (
		<>
            <SignupContainer  >
                <SignupForm form={form} setForm={setForm}
                    isChecked={isChecked}
                    checkPassword={setIsChecked}
                    authId={authId}
                    setAuthId={setAuthId}
                    setIsChekedEmail={setIsChekedEmail}
                    setIsCheckedId={setIsCheckedId}
                    isCheckedId={ isCheckedId}
                >
                </SignupForm>
                <button
                className={UserCSS.signup_button_hilight}
                onClick={fetchSignup}>회원 가입</button>
            </SignupContainer>
		</>
	);
}

export default Signup;

//각 스텝 완성 후  가능하다면분리작업을 해야 될 듯. 번잡스러움
