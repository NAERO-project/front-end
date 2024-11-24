import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

function BrandPageLayout(){
    return(
        <>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default BrandPageLayout;