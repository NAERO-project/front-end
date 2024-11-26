import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callBannerApi } from "../../apis/BannerApiCall";
import Banner from "../../components/common/banner/Banner";
import MainBannerCSS from "./css/MainBanner.module.css";

function MainBanner(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { bannerId } = useParams();

    const bannerList = useSelector(state => state.bannerReducer);

    console.log("bannerList", bannerList);

    useEffect(() => {
            fetchData();
        },[]);

    const fetchData=()=>{dispatch(callBannerApi())}

    useEffect(()=>{
        console.log(bannerList,"확인");
    },[bannerList]);


    return(
        <>
            <Carousel className={MainBannerCSS.banner_box} fade interval={3000} controls={false} indicators={false}>
                {Array.isArray(bannerList) && bannerList.map((banner) => (
                    <Carousel.Item key={banner.bannerId}>
                        <Banner banner={banner} />
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default MainBanner;