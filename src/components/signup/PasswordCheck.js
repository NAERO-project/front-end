import React, { useEffect, useState } from "react";
import { callPasswordCheck } from "../../apis/AuthApiCall";
import { useDispatch, useSelector } from "react-redux";
import { GET_PASS_CHECK } from "../../modules/AuthModule";

import PasswordCSS from "./css/PasswordCheck.module.css";
import UserInfoCSS from "./css/UserInfoForm.module.css";

function PasswordCheck({ setstate }) {
	const checkFetch = useSelector(state => state.authReducer || {});
	const dispatch = useDispatch();

	const [password, setpassword] = useState("");

    useEffect(() => { 
        return() => {
            dispatch({ type: GET_PASS_CHECK, payload: { status: 0 } });
          };
    }, [])
    
	useEffect(() => {
		console.log(checkFetch);
		if (checkFetch.status === 200) {
			setstate(true);
		}
	}, [checkFetch]);

	const clickBtn = () => {
		dispatch(callPasswordCheck({ password }));
	};

	return (
		<div className={PasswordCSS.box}>
			<div className={UserInfoCSS.info}>
				<input
					className={UserInfoCSS.txt}
					style={{padding: '5px 10px'}}
					type='password'
					onChange={e => {
						setpassword(e.target.value);
					}}
				></input>
				<button className={PasswordCSS.btn} onClick={clickBtn}>비밀번호 인증</button>
			</div>
			
		</div>
	);
}

export default PasswordCheck;
