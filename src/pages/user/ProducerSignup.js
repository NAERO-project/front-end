import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignupCSS from "./css/ProducerSignup.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";

function ProducerSignup(props) {
	const navigate = useNavigate();
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

	const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

	const callConvertToProducerAPI = ({ form }) => {
		const requestURL = `${prefix}/api/user/insert/producer`;
		console.log("실행", form);
		return async () => {
			const result = await fetch(requestURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
				},
				body: JSON.stringify(form),
			}).then(response => {
				return response.json();
			});
			console.log("사업자 전환", result);

			if (result.status === 200) {
				window.localStorage.removeItem("accessToken");
				window.localStorage.setItem("accessToken", result.data.accessToken);

				navigate("/producer/detail", { replace: true });
			} else {
				alert("등록에 실패했습니다. 다시시도해주세요.");
			}
		};
	};

	const onChangeHandler = e => {
		console.log(form);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={SignupCSS.box}>
			<form>

				<div className={UserInfoCSS.info}>
					<p style={{ width: "75px", padding: "5px 0 0 0" }}>브랜드명 : </p>
					<div>
					<input
						className={UserInfoCSS.txt}
						required
						type='text'
						name='producerName'
						placeholder='브랜드명'
						onChange={onChangeHandler}
					></input>
					</div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{ width: "75px", padding: "5px 0 0 0" }}>사업자<br/>번호 : </p>
					<div>
					<input
						className={UserInfoCSS.txt}
						required
						type='text'
						name='busiNo'
						placeholder='사업자 번호'
						onChange={onChangeHandler}
					></input>
					</div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{ width: "75px", padding: "5px 0 0 0" }}>사업장<br/>주소 : </p>
					<div>
					<input
						className={UserInfoCSS.txt}
						type='text'
						name='producerAdd'
						placeholder='주소'
						onChange={onChangeHandler}
					></input>
					</div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{ width: "75px", padding: "5px 0 0 0" }}>연락처 : </p>
					<div>
					<input
						className={UserInfoCSS.txt}
						type='text'
						name='producerPhone'
						placeholder='연락처'
						onChange={onChangeHandler}
					></input>
					</div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{ width: "75px", padding: "5px 0 0 0" }}>배달비 : </p>
					<div>
					<input
						className={UserInfoCSS.txt}
						type='text'
						name='deliveryFee'
						placeholder='배달비'
						onChange={onChangeHandler}
					></input>
					</div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{ width: "75px", padding: "5px 0 0 0" }}>무료배달<br/>기준 : </p>
					<div>
					<input
						className={UserInfoCSS.txt}
						type='text'
						name='deliveryCrit'
						placeholder='무료배달 기준'
						onChange={onChangeHandler}
					></input>
					</div>
				</div>

				<div style={{margin: '20px 0 0 0'}}>
					<button style={{width: '70px', height: '35px', margin: '0 10px 0 0', borderRadius: '8px' ,color: '#fff', backgroundColor: '#647453'}} type='button' onClick={fetchSignup}>
						등록
					</button>
					<button style={{width: '70px', height: '35px', border: '1px solid #CF5346', borderRadius: '8px' ,color: '#CF5346', backgroundColor: '#fff'}} onClick={cancelInsert}>취소</button>
				</div>
				
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
