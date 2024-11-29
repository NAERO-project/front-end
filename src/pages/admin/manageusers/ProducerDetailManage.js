import { useDispatch, useSelector } from "react-redux";
import ProducerInfoForm from "../../../components/signup/ProducerInfoForm";
import { useEffect } from "react";
import { callUserDetailManageAPI } from "../../../apis/ManageApiCall";
import { NavLink, useParams } from "react-router-dom";

function ProducerDetailManage(props) {
    const dispatch = useDispatch();
	const producer = useSelector(state => state.manageDetailReducer.data || {});
    const { username } = useParams();
    useEffect(() => {
        console.log("username",username)
		dispatch(callUserDetailManageAPI({ username: username }));
	}, [username]);

	useEffect(() => {
		console.log("producer 확인", producer);
	}, [producer]);

	return (
        <div style={{ color: "black" }}>
            <NavLink  to={"/admin/producer-update/"+username}>수정하기</NavLink>
			{producer && (
				<div>
					{producer.producerName && (
						<ProducerInfoForm producer={producer}></ProducerInfoForm>
					)}
				</div>
			)}
		</div>
	);
}

export default ProducerDetailManage;