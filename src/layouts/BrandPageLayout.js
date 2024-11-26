import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import BrandBanner from "../pages/banner/BrandBanner";

function BrandPageLayout(){
    return(
        <>
            <BrandBanner/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default BrandPageLayout;