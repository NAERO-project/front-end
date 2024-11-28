import { useNavigate, useParams } from "react-router-dom";
import ProducerUpdateForm from "../../../components/signup/ProducerUpdateForm";
import WithdrawButton from "../../../components/signup/WithdrawButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callUserDetailManageAPI } from "../../../apis/ManageApiCall";

function ProducerUpdateManage(props) {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.manageDetailReducer || {})
    const getUser = useSelector(state => state.manageDetailReducer.data || undefined);
    useEffect(() => {
        if(getUser===undefined)
		    dispatch(callUserDetailManageAPI({ username: username }));
    }, [username]);
    useEffect(() => { 
        if (user.status === 201) { 
            console.log("성공")
            navigate("/admin/producer-detail/"+username, { replace: true });
    } },[user])
    return (
        <div>  
            {getUser &&
                <ProducerUpdateForm user={getUser} username={username} />
            }
            <WithdrawButton comment={"사업장 정보 삭제"}
                url={"/manager/withdraw/producer"} username={username} />
        </div>
    );
}

export default ProducerUpdateManage;