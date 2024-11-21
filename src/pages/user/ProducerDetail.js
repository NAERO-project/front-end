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

	return (
		<div style={{ color: "black" }}>
			<h2>{userFullName} 님 안녕하세요 </h2>
			{producer && <ProducerInfoForm user={producer}></ProducerInfoForm>}
			<WithdrawButton />
		</div>
	);
}

export default ProducerDetail;
