import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callUpdateUserAPI } from '../../apis/UserApiCall';
import { decodeJwt } from '../../utils/tokenUtils';
import { callUpdateUserManageAPI } from '../../apis/ManageApiCall';

function UserUpdateForm({ user }) {

    const [passwordCheck, setPasswordCheck] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const isLogin = window.localStorage.getItem("accessToken");
    const isAdmin = decodeJwt(isLogin).auth.some(a => /ROLE_.*_ADMIN/.test(a));
    const dispatch = useDispatch();
  
    console.log(user)

	const [form, setForm] = useState({
		password: "",
		userFullName: "",
        userPhone: "",
        username:user.username
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
        if (isAdmin) { 
            dispatch(callUpdateUserManageAPI({ form: form }))
        }
        else {
            dispatch(callUpdateUserAPI({ form: form }));
        }
	};
    return (
        <div>
            <form>
                <h2> 수정할 정보만 입력해주세요 </h2>
                <label>이름</label>
                <input
                    type='text'
                    name='userFullName'
                    placeholder={ user.userFullName}
					autoComplete='off'
					onChange={onChangeHandler}
                />{ !isAdmin &&
                <div>
                <label>새 비밀번호</label>
				<input
					type='password'
					name='password'
					placeholder='비밀번호'
					autoComplete='off'
					onChange={onChangeHandler}
					required
                />
                <label>비밀번호 확인</label>
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
                    {form.password && passwordCheck && (isChecked ? <> 일치</> : <>불일치</>)}
                    </div>}
                <label>연락처</label>
				<input
					type='text'
					name='userPhone'
                    placeholder={ user.userPhone}
					autoComplete='off'
					onChange={onChangeHandler}
				/>
				<button onClick={fetchUpdate}>수정 요청</button>{" "}
				
			</form>
        </div>
    );
}

export default UserUpdateForm;