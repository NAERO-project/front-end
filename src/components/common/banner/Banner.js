import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";
import BannerCSS from "./css/Banner.module.css";

function Banner({
    banner: { bannerId, bannerImg, bannerThumbnail ,bannerUrl }
}){

    const navigate = useNavigate();

    const onClickBannerHandler = (bannerUrl) =>{
        navigate(`/banner/${bannerUrl}`, {replace: false});
    };

    return(
        // <div onClick={() =>onClickBannerHandler()}>
        <div>
            <img className={BannerCSS.banner_img} src={bannerImg} alt={bannerId} />
        </div>
        
    );
}

export default Banner;