import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callBannerUpdateApi } from "../../apis/BannerApiCall";

import AdminBannerUpdateCSS from "./manageusers/css/AdminBannerUpdate.module.css";

function AdminBannerUpdate({bannerId, onClose}){

    const dispatch = useDispatch();
    // const params = useParams();
    // const bannerId = params.bannerId;

    const banners = useSelector(state => state.bannerReducer);
    const bannerList = banners.data;

    console.log("bannerList: ", bannerList);
    console.log("bannerId", bannerId);

    const navigate = useNavigate();

    const [form, setForm] = useState({});

    const onChangeHandler = e =>{
        setForm({
            bannerAcceptStatus: "Y",
            [e.target.name]: e.target.value
        })
    }

    const onClickBannerUpdateHandler = ()=>{

        const formData = new FormData();
        formData.append('bannerId', bannerId);  //bannerId 추가
        formData.append('bannerAcceptStatus', form.bannerAcceptStatus); //상태를 'Y'로 설정

        // useEffect(() =>{
        //     dispatch(callBannerUpdateApi({
        //         form: formData
        //     }));
        // }, [bannerId]);

        dispatch(callBannerUpdateApi({
            form: formData
        }));

        alert('배너 등록했습니다.');
        onClose(true); // 모달 닫기
        // navigate('/admin/banner-manage', {replace: true});
    }

    return(
        <>
            <div className={AdminBannerUpdateCSS.box}>
                <div className={AdminBannerUpdateCSS.banner}>
                    <div>
                        <input 
                        className={AdminBannerUpdateCSS.img_box}
                        name="bannerAcceptStatus" 
                        placeholder="등록 여부" 
                        onChange={onChangeHandler}/>
                    </div>          
                </div>
                <div>
                    <button className={AdminBannerUpdateCSS.regist_btn} onClick={onClickBannerUpdateHandler}>배너 등록</button>
                    <button className={AdminBannerUpdateCSS.close_btn} onClick={() => onClose(false)}>닫기</button> {/* 닫기 버튼 추가 */}
                </div>
            </div>
            <div className={AdminBannerUpdateCSS.blur}></div>
        </>
        
    );
}

export default AdminBannerUpdate;