import React, { useEffect, useState } from "react";
import PasswordCheck from "../../components/signup/PasswordCheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserUpdateForm from "../../components/signup/UserUpdateForm";
import WithdrawButton from "../../components/signup/WithdrawButton";
import { decodeJwt } from "../../utils/tokenUtils";
import { callUserDetailAPI } from "../../apis/UserApiCall";
import UpdateUserCSS from "./css/UpdateUser.module.css";

//유저 정보수정엔 단순 정보 수정 외에 비밀번호 수정도 필요함
function UpdateUser(props) {
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
            navigate("/mypage/detail", { replace: true });
    } },[user])
    return <div>{!isAuthed ? <PasswordCheck setstate={setIsAuthed} /> :
        <div className={UpdateUserCSS.box}><UserUpdateForm user={user.data?.user||user.data} />
            <WithdrawButton comment={"회원 탈퇴"} url={"/user/withdraw"} /></div>}</div>;
}

export default UpdateUser;
