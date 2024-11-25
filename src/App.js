import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import ProducerPageLayout from "./layouts/ProducerPageLayout";
import ProductManage from "./pages/producer/ProductManage";
import ProductRegist from "./pages/producer/ProductRegist";
import MainFoodList from "./pages/products/MainFoodList";
import MainBeautyList from "./pages/products/MainBeautyList";
import MainFashionList from "./pages/products/MainFashionList";
import ProductMore from "./pages/products/ProductMore";
import ProductDetail from "./pages/products/ProductDetail";
import ProductPageLayout from "./layouts/ProductPageLayout";
import ProductCategory from "./pages/products/ProductCategory";
import AdminPageLayout from "./layouts/AdminPageLayout";
import Signup from "./pages/user/Signup";
import UserDetail from "./pages/user/UserDetail";
import ProducerDetail from "./pages/user/ProducerDetail";
import ProducerSignup from "./pages/user/ProducerSignup";
import UpdateUser from "./pages/user/UpdateUser";
import UpdateProducer from "./pages/user/UpdateProducer";
import MypageLayout from "./layouts/MypageLayout";
import Order from "./pages/order/Order";
import BrandPageLayout from "./layouts/BrandPageLayout";
import BrandProductList from "./pages/products/brand/BrandProductList";
import BrandProducer from "./components/common/products/brand/BrandProducer";
import MyOrders from "./pages/order/MyOrders";
import OrderManage from "./pages/producer/OrderManage";
import OrderUpdate from "./pages/producer/OrderUpdate";
import Dashboard from "./pages/admin/Dashboard";
import MainList from "./pages/products/MainList";

function App() {
	return (
		<BrowserRouter>
			<Routes>

				<Route path='/' element={<Layout />}>
					<Route index element={<Main />}/>
          <Route path="preview/food" element={ <MainFoodList/> }/>
					<Route path="preview/beauty" element={ <MainBeautyList/> }/>
					<Route path="preview/fashion" element={ <MainFashionList/> }/>

          <Route path='products' element={<ProductPageLayout/>}>
						<Route path='more' element={ <ProductMore/> }/>
						<Route path="more/:largeId" element={ <ProductCategory/> }/>
						<Route path="more/:largeId/:mediumId" element={ <ProductCategory/> }/>
						<Route path=":productId" element={ <ProductDetail/> }/>
            <Route path="brand/:producerId" element={ <BrandProducer/> }/>
					</Route>


          <Route path='products/brand' element={ <BrandPageLayout/> }>
              <Route path="home" element={ <BrandProductList/> }/>
              <Route path="home/:producerId" element={ <BrandProductList/> }/>
            </Route>

          <Route path='mypage' element={<MypageLayout />}>
            <Route path='detail' element={<UserDetail />} />
            <Route path='update' element={<UpdateUser />} />
            <Route path='toproducer' element={<ProducerSignup />}></Route>
            <Route path='order' element={<MyOrders />} />
            {/* 회원들의 마이페이지 */}
				  </Route>

          {/* <Route path='brand' element={ <BrandPageLayout/> }>
            <Route path="home" element={ <BrandProductList/> }/>
          </Route> */}

          <Route path="order" element={<Order />} />

          <Route path="mypage">{/* 회원들의 마이페이지 */}</Route>

          <Route path="producer" element={<ProducerPageLayout />}>
            <Route index element={<ProductManage />} />
            <Route path="product-manage" element={<ProductManage />} />
            <Route path="product-regist" element={<ProductRegist />} />
            <Route path='detail' element={<ProducerDetail />} />
            <Route path='update' element={<UpdateProducer />} />
            <Route path="order-manage" element={<OrderManage />} />
            <Route path="order-update/:orderId" element={<OrderUpdate />} />
            {/* <Route path="coupon-manage" element={<CouponManage />} /> */}
            {/* <Route path="banner-manage" element={<BannerManage />} /> */}
            {/* <Route path="products/:producerId" element={ <ProducerItem/> }/> */}
          </Route>

          <Route path="login" element={<Login />} />
            <Route path='signup' element={<Signup />} />

          <Route path="admin" element={<AdminPageLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product-manage" element={<ProductManage />} />
            {/* <Route path="user-manage" element={<UserManage />} /> */}
            {/* <Route path="producer-manage" element={<ProducerManage />} /> */}
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
