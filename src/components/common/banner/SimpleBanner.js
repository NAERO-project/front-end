import SimpleBannerCSS from "./css/SimpleBanner.module.css";

function SimpleBanner(){

    return(
        <div className={SimpleBannerCSS.producer_box}>
            <div className={SimpleBannerCSS.producer_img}>
                <div className={SimpleBannerCSS.blur}></div>
            </div>
        </div>
    );
}

export default SimpleBanner;