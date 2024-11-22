import React, { useEffect, useState } from "react";
import PasswordCheck from "../../components/signup/PasswordCheck";
import WithdrawButton from "../../components/signup/WithdrawButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callUpdateProducerAPI } from "../../apis/UserApiCall";
function UpdateProducer(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isAuthed, setIsAuthed] = useState(false);
	const [form, setForm] = useState({
		busiNo: "",
		producerAdd: "",
		producerName: "",
		producerPhone: "",
		deliveryFee: "",
		deliveryCrit: "",
	});

	const onChangeHandler = e => {
		console.log(form);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const fetchUpdate = e => {
		e.preventDefault();
		window.confirm("입력하신 정보로 수정됩니다.");

		dispatch(callUpdateProducerAPI({ form: form }));
	};

	const updateFrom = () => {
		return (
			<>
				<h2> 수정할 정보만 입력해주세요 </h2>
				<form>
					<p>
						<label>브랜드명</label>
						<input
							required
							type='text'
							name='producerName'
							placeholder='브랜드명'
							onChange={onChangeHandler}
						></input>
					</p>
					<p>
						<label>사업자 번호</label>
						<input
							required
							type='text'
							name='busiNo'
							placeholder='사업자 번호'
							onChange={onChangeHandler}
						></input>
					</p>
					<p>
						<label>사업장 주소</label>
						<input
							type='text'
							name='producerAdd'
							placeholder='주소'
							onChange={onChangeHandler}
						></input>
					</p>
					<p>
						<label>연락처</label>
						<input
							type='text'
							name='producerPhone'
							placeholder='연락처'
							onChange={onChangeHandler}
						></input>
					</p>
					<p>
						<label>배달비</label>
						<input
							type='number'
							name='deliveryFee'
							placeholder='배달비'
							onChange={onChangeHandler}
						></input>
					</p>
					<p>
						<label>무료배달 기준</label>
						<input
							type='number'
							name='deliveryCrit'
							placeholder='무료배달 기준'
							onChange={onChangeHandler}
						></input>
					</p>
				</form>
				<button onClick={fetchUpdate}>수정 요청</button>
				<WithdrawButton comment={"사업장 정보 삭제"} url={"/user/withdraw/producer"} />
			</>
		);
	};

	return <div>{!isAuthed ? <PasswordCheck setstate={setIsAuthed} /> : updateFrom()}</div>;
}

export default UpdateProducer;
