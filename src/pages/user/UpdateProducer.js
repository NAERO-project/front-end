import React, { useEffect, useState } from "react";
import PasswordCheck from "../../components/signup/PasswordCheck";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { callUserDetailAPI } from "../../apis/UserApiCall";
import ProducerUpdateForm from "../../components/signup/ProducerUpdateForm";
import WithdrawButton from "../../components/signup/WithdrawButton";
function UpdateProducer(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAuthed, setIsAuthed] = useState(false);
    const user = useSelector(state => state.userReducer || {});
    useEffect(() => { 
        if (user.status !== 203) {
            const isLogin = window.localStorage.getItem("accessToken");
	        const username = decodeJwt(isLogin).sub;
            dispatch(callUserDetailAPI({ username: username }));
        }
    }, [])
    useEffect(() => {
        if (user.status === 204) { 
            navigate("/producer/detail", { replace: true });
    } },[user])

    return <div>{!isAuthed ? <PasswordCheck setstate={setIsAuthed} /> : <div><ProducerUpdateForm user={ user.data} />
				<WithdrawButton comment={"사업장 정보 삭제"} url={"/user/withdraw/producer"} /></div>}</div>;
}

export default UpdateProducer;
