import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callBannerApi } from "../../apis/BannerApiCall";
import Banner from "../../components/common/banner/Banner";
import BrandBannerCSS from "./css/BrandBanner.module.css";

function BrandBanner(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const bannerList = useSelector(state => state.bannerReducer);

    console.log("bannerList", bannerList);

    useEffect(() => {
            fetchData();
        },[]);

    const fetchData=()=>{dispatch(callBannerApi())}

    useEffect(()=>{
        console.log(bannerList,"확인");
    },[bannerList]);

    // 배너를 3개씩 묶어 반환
    const getBannersInGroups = banners =>{
        const groups =[];
        for(let i=0; i<banners.length; i+=3){
            groups.push(banners.slice(i, i+3));
        }
        return groups;
    };

    const bannerGroups = getBannersInGroups(bannerList);


    return(
        <>
            <Carousel className={BrandBannerCSS.banner_box} fade interval={3000} controls={true} indicators={true}>
                {bannerGroups.map((group, index) => (
                    <Carousel.Item key={index}>
                        <div className={BrandBannerCSS.banner_group}>
                            {group.map((banner) => (
                                <div key={banner.bannerId} style={{width: '1035px'}}>
                                    <Banner banner={banner} />
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default BrandBanner;