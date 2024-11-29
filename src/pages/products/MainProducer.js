import { Link } from "react-router-dom";
import MainProducerCSS from "./css/MainProducer.module.css";

function MainProducer(){

    return(
        <div className={MainProducerCSS.producer_box}>
            <div className={MainProducerCSS.producer_img}>
                <div className={MainProducerCSS.blur}></div>
                <Link to="/products/brand/home" className={MainProducerCSS.producer_btn}>더보기</Link>
            </div>
{/* 
            <div className={MainProducerCSS.producer_img}>
                <div className={MainProducerCSS.blur}></div>
                <Link to="/products/brand/home" className={MainProducerCSS.producer_btn}>더보기</Link>
            </div> */}
        </div>
    );
}

export default MainProducer;