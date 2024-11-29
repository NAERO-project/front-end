import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callUserDetailManageAPI } from "../../../apis/ManageApiCall";
import { NavLink, useParams } from "react-router-dom";
import UserInfoForm from "../../../components/signup/UserInfoForm";
function UserDetailManage(props) {
    
    const dispatch = useDispatch();
    const get = useSelector(state => state.manageDetailReducer.data || {});
    const { username } = useParams();
    console.log("username", username)
    
	const user = (get.user !== undefined) ? get.user : get;
    useEffect(() => {
		dispatch(callUserDetailManageAPI({ username: username }));
    }, [username]);
    return (
        <div>
            <NavLink to={"/admin/user-update/"+username} >수정하기</NavLink>

            {user && (<UserInfoForm user={user}></UserInfoForm>)}
        </div>
    );
}

export default UserDetailManage;