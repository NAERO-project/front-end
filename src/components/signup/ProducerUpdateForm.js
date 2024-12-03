import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callUpdateProducerAPI } from '../../apis/UserApiCall';
import WithdrawButton from './WithdrawButton';
import { decodeJwt } from '../../utils/tokenUtils';
import { callUpdateProducerManageAPI } from '../../apis/ManageApiCall';

import UserInfoCSS from "../signup/css/UserInfoForm.module.css";
import UpdateCSS from "./css/ProducerUpdate.module.css";

function ProducerUpdateForm({ user, username }) {
    
    const isLogin = window.localStorage.getItem("accessToken");
    const isAdmin = decodeJwt(isLogin).auth.some(a => /ROLE_.*_ADMIN/.test(a));
    console.log("유저",user)
	const dispatch = useDispatch();
    const [form, setForm] = useState({
		busiNo: "",
		producerAdd: "",
		producerName: "",
		producerPhone: "",
		deliveryFee: "",
		deliveryCrit: "",
	});

    
	const fetchUpdate = e => {
		e.preventDefault();
		window.confirm("입력하신 정보로 수정됩니다.");
        if (isAdmin) { 
            dispatch(callUpdateProducerManageAPI({ form: form, username:username }))
        }
        else{
            dispatch(callUpdateProducerAPI({ form: form }));
        }
	};

	const onChangeHandler = e => {
		console.log(form);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
    };
    
    return (
        <div>
				{/* <h3> 수정할 정보만 입력해주세요 </h3> */}
				<form>
					<div className={UserInfoCSS.info}>
						<p>브랜드명</p>
						<div className={UserInfoCSS.txt}>
						<input
								required
								type='text'
								name='producerName'
								placeholder={user.producerName}
								onChange={onChangeHandler}
							></input>
						</div>
					</div>

					<div className={UserInfoCSS.info}>
						<p>사업자 번호</p>
						<div className={UserInfoCSS.txt}>
						<input
							required
							type='text'
							name='busiNo'
							placeholder={user.busiNo}
							onChange={onChangeHandler}
						></input>
						</div>
					</div>

					<div className={UserInfoCSS.info}>
						<p>사업장 주소</p>
						<div className={UserInfoCSS.txt}>
						<input
							type='text'
							name='producerAdd'
							placeholder={user.producerAdd}
							onChange={onChangeHandler}
						></input>
						</div>
					</div>

					<div className={UserInfoCSS.info}>
						<p>연락처</p>
						<div className={UserInfoCSS.txt}>
						<input
							type='text'
							name='producerPhone'
							placeholder={user.producerPhone}
							onChange={onChangeHandler}
						></input>
						</div>
					</div>

					<div className={UserInfoCSS.info}>
						<p>배달비</p>
						<div className={UserInfoCSS.txt}>
						<input
							type='number'
							name='deliveryFee'
							placeholder={user.deliveryFee+"원"}
							onChange={onChangeHandler}
						></input>
						</div>
					</div>

					<div className={UserInfoCSS.info}>
						<p>무료배달 기준</p>
						<div className={UserInfoCSS.txt}>
						<input
							type='number'
							name='deliveryCrit'
							placeholder={user.deliveryCrit+"원"}
							onChange={onChangeHandler}
						></input>
						</div>
					</div>

				</form>
				<button className={UpdateCSS.btn} onClick={fetchUpdate}>수정 요청</button>
        </div>
    );
}

export default ProducerUpdateForm;