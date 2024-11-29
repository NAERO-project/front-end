import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import BrandBanner from "../pages/banner/BrandBanner";
import SimpleBanner from "../components/common/banner/SimpleBanner";

function BrandPageLayout(){
    return(
        <>
            <SimpleBanner/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default BrandPageLayout;