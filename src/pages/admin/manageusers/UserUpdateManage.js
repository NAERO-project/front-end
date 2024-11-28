import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callUserDetailManageAPI } from "../../../apis/ManageApiCall";
import UserUpdateForm from "../../../components/signup/UserUpdateForm";
import WithdrawButton from "../../../components/signup/WithdrawButton";

function UserUpdateManage(props) {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.manageDetailReducer || {})
    const getUser = useSelector(state => state.manageDetailReducer.data || undefined);
    useEffect(() => {
        // console.log(getUser, "getuser 출력");
        if (!getUser)
		    dispatch(callUserDetailManageAPI({ username: username }));
    }, []);

    useEffect(() => { 
        if (user.status === 201) { 
            console.log("성공")
            navigate("/admin/user-detail/"+username, { replace: true });
    } },[user])
    return (
        <div>{getUser &&
            <UserUpdateForm user={ getUser?.user|| getUser} />
        }
            <WithdrawButton comment={"회원 탈퇴"}
                url={"/manager/withdraw/user"} username={username} />
        </div>
    );
}

export default UserUpdateManage;