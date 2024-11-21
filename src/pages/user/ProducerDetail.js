import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callUserDetailAPI } from "../../apis/UserApiCall";
import { decodeJwt } from "../../utils/tokenUtils";
import WithdrawButton from "../../components/signup/WithdrawButton";
import ProducerInfoForm from "../../components/signup/ProducerInfoForm";

function ProducerDetail(props) {
	const dispatch = useDispatch();
	const producer = useSelector(state => state.userReducer.data || {});

	const username = decodeJwt(window.localStorage.getItem("accessToken")).sub;
	const userFullName = window.localStorage.getItem("userFullName");

	useEffect(() => {
		dispatch(callUserDetailAPI({ username: username }));
	}, []);

	useEffect(() => {
		console.log("producer 확인", producer);
	}, [producer]);

	return (
		<div style={{ color: "black" }}>
			{producer && (
				<div>
					<h2>{userFullName} 님 안녕하세요 </h2>
					{producer.producerName && (
						<ProducerInfoForm producer={producer}></ProducerInfoForm>
					)}
					<WithdrawButton />
				</div>
			)}
		</div>
	);
}

export default ProducerDetail;
