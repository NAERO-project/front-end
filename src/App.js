import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import MainList from "./pages/products/MainList";
import ProducerPageLayout from "./layouts/ProducerPageLayout";
import ProductManage from "./pages/producer/ProductManage";
import ProductRegist from "./pages/producer/ProductRegist";
import MainFoodList from "./pages/products/MainFoodList";
import MainBeautyList from "./pages/products/MainBeautyList";
import MainFashionList from "./pages/products/MainFashionList";
import ProductMore from "./pages/products/ProductMore";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />

					<Route path='products'>
						<Route path="preview" element={ <MainList/> }/>
						<Route path="preview/food" element={ <MainFoodList/> }/>
						<Route path="preview/beauty" element={ <MainBeautyList/> }/>
						<Route path="preview/fashion" element={ <MainFashionList/> }/>
						<Route path="more" element={ <ProductMore/> }/>
						<Route path="more:mediumId" element={ <ProductMore/> }/>
					
					</Route>

          <Route path="mypage">{/* 회원들의 마이페이지 */}</Route>

          <Route path="producer" element={<ProducerPageLayout />}>
            <Route index element={<ProductManage />} />
            <Route path="product-manage" element={<ProductManage />} />
            <Route path="product-regist" element={<ProductRegist />} />
            {/* <Route path="order-manage" element={<OrderManage />} /> */}
            {/* <Route path="coupon-manage" element={<CouponManage />} /> */}
            {/* <Route path="banner-manage" element={<BannerManage />} /> */}
          </Route>

          <Route path="management">{/* 관리자들의 관리페이지 */}</Route>

          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;