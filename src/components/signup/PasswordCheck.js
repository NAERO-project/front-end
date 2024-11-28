import React, { useEffect, useState } from "react";
import { callPasswordCheck } from "../../apis/AuthApiCall";
import { useDispatch, useSelector } from "react-redux";
import { GET_PASS_CHECK } from "../../modules/AuthModule";

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
		<div>
			<input
				type='password'
				onChange={e => {
					setpassword(e.target.value);
				}}
			></input>
			<button onClick={clickBtn}>비밀번호 인증</button>
		</div>
	);
}

export default PasswordCheck;
