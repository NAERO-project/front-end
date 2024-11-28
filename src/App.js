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
import ProductDetail from "./pages/products/ProductDetail";
import AdminPageLayout from "./layouts/AdminPageLayout";
import Dashboard from "./pages/admin/Dashboard";
import Signup from "./pages/user/Signup";
import UserDetail from "./pages/user/UserDetail";
import ProducerDetail from "./pages/user/ProducerDetail";
import ProducerSignup from "./pages/user/ProducerSignup";
import UpdateUser from "./pages/user/UpdateUser";
import UpdateProducer from "./pages/user/UpdateProducer";
import MypageLayout from "./layouts/MypageLayout";
import ProducerManage from "./pages/admin/manageusers/ProducerManage";
import UserManage from "./pages/admin/manageusers/UserManage";
import ProducerDetailManage from "./pages/admin/manageusers/ProducerDetailManage";
import UserDetailManage from "./pages/admin/manageusers/UserDetailManage";
import ProducerUpdateManage from "./pages/admin/manageusers/ProducerUpdateManage";
import UserUpdateManage from "./pages/admin/manageusers/UserUpdateManage";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='mypage' element={<MypageLayout />}>
					<Route path='detail' element={<UserDetail />} />
					<Route path='update' element={<UpdateUser />} />
					<Route path='toproducer' element={<ProducerSignup />}></Route>
					{/* 회원들의 마이페이지 */}
				</Route>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />

					<Route path='products'>
						<Route path="preview" element={ <MainList/> }/>
						<Route path="preview/food" element={ <MainFoodList/> }/>
						<Route path="preview/beauty" element={ <MainBeautyList/> }/>
						<Route path="preview/fashion" element={ <MainFashionList/> }/>
						<Route path="more" element={ <ProductMore/> }/>
						<Route path="more:mediumId" element={ <ProductMore/> }/>
						<Route path=":productId" element={ <ProductDetail/> }/>
					
					</Route>
					<Route path='product'>{/* 상품관련 페이지 */}</Route>

					<Route path='producer'>
						<Route path='detail' element={<ProducerDetail />} />
						<Route path='update' element={<UpdateProducer />} />
						{/* 판매자 페이지 */}
					</Route>

          <Route path="producer" element={<ProducerPageLayout />}>
            <Route index element={<ProductManage />} />
            <Route path="product-manage" element={<ProductManage />} />
            <Route path="product-regist" element={<ProductRegist />} />
            {/* <Route path="order-manage" element={<OrderManage />} /> */}
            {/* <Route path="coupon-manage" element={<CouponManage />} /> */}
            {/* <Route path="banner-manage" element={<BannerManage />} /> */}
          </Route>

          <Route path="login" element={<Login />} />
            <Route path='signup' element={<Signup />} />
			
          <Route path="admin" element={<AdminPageLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product-manage" element={<ProductManage />} />
            <Route path="user-manage" element={<UserManage />} />
            <Route path="producer-manage" element={<ProducerManage />} />
            <Route path="producer-detail/:username" element={<ProducerDetailManage />} />
            <Route path="user-detail/:username" element={<UserDetailManage />} />
            <Route path="producer-update/:username" element={<ProducerUpdateManage />} />
            <Route path="user-update/:username" element={<UserUpdateManage />} />
            
            {/* <Route path="promotion-manage" element={<PromotionManage />} /> */}
            {/* <Route path="order-manage" element={<OrderManage />} /> */}
            {/* <Route path="FAQ-manage" element={<FAQManage />} /> */}
            {/* <Route path="inquiry-manage" element={<InquiryManage />} /> */}
          </Route>

          <Route path="login" element={<Login />} />
            <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
