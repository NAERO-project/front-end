import { useDispatch, useSelector } from "react-redux";
import ProducerInfoForm from "../../../components/signup/ProducerInfoForm";
import { useEffect } from "react";
import { callUserDetailManageAPI } from "../../../apis/ManageApiCall";
import { NavLink, useParams } from "react-router-dom";

import ProducerDetailManageCSS from "./css/ProducerDetailManage.module.css";

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
        <div className={ProducerDetailManageCSS.div_box}>
			<div className={ProducerDetailManageCSS.div}>
				{producer && (
					<div>
						{producer.producerName && (
							<ProducerInfoForm producer={producer}></ProducerInfoForm>
						)}
					</div>
				)}
				<NavLink className={ProducerDetailManageCSS.btn} to={"/admin/producer-update/"+username}>수정</NavLink>
			</div>
            
		</div>
	);
}

export default ProducerDetailManage;