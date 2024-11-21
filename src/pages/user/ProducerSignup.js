import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callConvertToProducerAPI } from "../../apis/UserApiCall";
function ProducerSignup(props) {
	const [form, setForm] = useState({
		busiNo: "",
		producerAdd: "",
		producerName: "",
		producerPhone: "",
		deliveryFee: 0,
		deliveryCrit: 0,
	});
	const cancelInsert = () => {};
	const fetchSignup = e => {
		e.preventDefault();
		callConvertToProducerAPI({ form })();
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
						type='text'
						name='deliveryFee'
						placeholder='배달비'
						onChange={onChangeHandler}
					></input>
				</p>
				<p>
					<label>무료배달 기준</label>
					<input
						type='text'
						name='deliveryCrit'
						placeholder='무료배달 기준'
						onChange={onChangeHandler}
					></input>
				</p>
				<button type='button' onClick={fetchSignup}>
					등록
				</button>
				<button onClick={cancelInsert}>취소</button>
			</form>
		</div>
	);
}

// int producerId;
// UserDTO user;
// String busiNo;
// String producerAdd;
// String producerName;
// String producerPhone;
// Integer deliveryFee;
// Integer deliveryCrit;

export default ProducerSignup;
