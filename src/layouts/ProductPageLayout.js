import { Outlet } from "react-router-dom";
import ProductNav from "../components/common/products/ProductNav";
import MainListCSS from "../pages/products/css/MainList.module.css";

function ProductPageLayout(){
    return(
            <div className={MainListCSS.main_list}>
                <ProductNav/>
                <main>
                    <Outlet/>
                </main>
            </div>
    );
}

export default ProductPageLayout;