import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import ProducerPageLayout from "./layouts/ProducerPageLayout";
import ProductManage from "./pages/producer/ProductManage";
import ProductRegist from "./pages/producer/ProductRegist";
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
import ProductUpdate from "./pages/producer/ProductUpdate";
import BannerManage from "./pages/producer/BannerManage";
import AdminBannerManage from "./pages/admin/AdminBannerManage";
import BannerRegist from "./pages/producer/BannerRegist";
import AdminBannerUpdate from "./pages/admin/AdminBannerUpdate";
import MyOrderDetail from "./pages/order/MyOrderDetail";
import Cart from "./pages/cart/Cart";
import CartOrder from "./pages/order/CartOrder";
import ProducerManage from "./pages/admin/manageusers/ProducerManage";
import UserManage from "./pages/admin/manageusers/UserManage";
import ProducerDetailManage from "./pages/admin/manageusers/ProducerDetailManage";
import UserDetailManage from "./pages/admin/manageusers/UserDetailManage";
import ProducerUpdateManage from "./pages/admin/manageusers/ProducerUpdateManage";
import UserUpdateManage from "./pages/admin/manageusers/UserUpdateManage";

// 문의 페이지 컴포넌트
import QuestionList from "./pages/questions/QuestionList";
import QuestionCreate from "./pages/questions/QuestionCreate";
import QuestionEdit from "./pages/questions/QuestionEdit";
import QuestionDetail from "./pages/questions/QuestionDetail";

// 답변 페이지 컴포넌트
import AnswerList from "./pages/answers/AnswerList";
import AnswerCreate from "./pages/answers/AnswerCreate";
import AnswerEdit from "./pages/answers/AnswerEdit";
import AnswerDetail from "./pages/answers/AnswerDetail";

// 리뷰 페이지 컴포넌트
import ReviewCreate from "./pages/reviews/ReviewCreate";
import MyReviews from "./pages/reviews/MyReviews";
import ReviewDetail from "./pages/reviews/ReviewDetail";
import ReviewEdit from "./pages/reviews/ReviewEdit";

function App() {
	return (
		<BrowserRouter>
			<Routes>

				<Route path='/' element={<Layout />}>
					<Route index element={<Main />}/>
          
          <Route path='products' element={<ProductPageLayout/>}>
						{/* <Route path='more' element={ <ProductMore/> }/> */}
						<Route path="more" element={ <ProductCategory/> }/>
						{/* <Route path="more" element={ <ProductCategory/> }/> */}
						<Route path="more/:largeId" element={ <ProductCategory/> }/>
						<Route path=":productId" element={ <ProductDetail/> }/>
            <Route path="brand/:producerId" element={ <BrandProducer/> }/>
					</Route>


          <Route path='products/brand' element={ <BrandPageLayout/> }>
              <Route path="home" element={ <BrandProductList/> }/>
              {/* <Route path="home/:producerId" element={ <BrandProductList/> }/> */}
              <Route path="home/:producerId" element={ <BrandProducer/> }/>
              <Route path="home/:producerId/:largeId" element={ <BrandProductList/> }/>
            </Route>

          <Route path='mypage' element={<MypageLayout />}>
            <Route path='detail' element={<UserDetail />} />
            <Route path='update' element={<UpdateUser />} />
            <Route path='toproducer' element={<ProducerSignup />}></Route>
            <Route path='order' element={<MyOrders />} />
            <Route path='order-detail/:orderId' element={<MyOrderDetail />} />

            <Route path="questions" element={<QuestionList />} />
						<Route path="questions/create" element={<QuestionCreate />} />
						<Route path="questions/edit/:questionId" element={<QuestionEdit />} />
						<Route path="questions/detail/:questionId" element={<QuestionDetail />} />
            {/* 회원들의 마이페이지 */}
				  </Route>

          {/* <Route path='brand' element={ <BrandPageLayout/> }>
            <Route path="home" element={ <BrandProductList/> }/>
          </Route> */}

          <Route path="order" element={<Order />} />

          <Route path="cart" element={<Cart/>} />
          <Route path="cart-order" element={<CartOrder/>} />

          <Route path="producer" element={<ProducerPageLayout />}>
            <Route index element={<ProductManage />} />
            <Route path="product-manage" element={<ProductManage />} />
            <Route path="product-regist" element={<ProductRegist />} />
            <Route path="product-modify/:productId" element={<ProductUpdate/>} />
            {/* <Route path="product-modify" element={<ProductModify/>} /> */}
            <Route path='detail' element={<ProducerDetail />} />
            <Route path='update' element={<UpdateProducer />} />
            <Route path="order-manage" element={<OrderManage />} />
            <Route path="order-update/:orderId" element={<OrderUpdate />} />
            {/* <Route path="coupon-manage" element={<CouponManage />} /> */}
            <Route path="banner-manage" element={<BannerManage />} />
            <Route path="banner-regist" element={<BannerRegist/>} />
            {/* <Route path="products/:producerId" element={ <ProducerItem/> }/> */}
          </Route>

          <Route path="login" element={<Login />} />
            <Route path='signup' element={<Signup />} />

          <Route path="admin" element={<AdminPageLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product-manage" element={<ProductManage />} />
            <Route path="banner-manage" element={<AdminBannerManage />} />
            <Route path="banner-update/:bannerId" element={<AdminBannerUpdate />} />
            <Route path="user-manage" element={<UserManage />} />
            <Route path="producer-manage" element={<ProducerManage />} />
            <Route path="producer-detail/:username" element={<ProducerDetailManage />} />
            <Route path="user-detail/:username" element={<UserDetailManage />} />
            <Route path="producer-update/:username" element={<ProducerUpdateManage />} />
            <Route path="user-update/:username" element={<UserUpdateManage />} />

            <Route path="answers" element={<AnswerList />} />
						<Route path="answers/create/:questionId" element={<AnswerCreate />} />
						<Route path="answers/edit/:questionId/:answerId" element={<AnswerEdit />} />
						<Route path="answers/detail/:questionId/:answerId" element={<AnswerDetail />} />
            
            {/* <Route path="promotion-manage" element={<PromotionManage />} /> */}
            {/* <Route path="order-manage" element={<OrderManage />} /> */}
            {/* <Route path="FAQ-manage" element={<FAQManage />} /> */}
            {/* <Route path="inquiry-manage" element={<InquiryManage />} /> */}
          </Route>

					{/* 1:1 문의 관련 라우트
					<Route path="mypage/questions">
						<Route index element={<QuestionList />} />
						<Route path="create" element={<QuestionCreate />} />
						<Route path="edit/:questionId" element={<QuestionEdit />} />
						<Route path="detail/:questionId" element={<QuestionDetail />} />
					</Route> */}



					{/* 1:1 답변 관련 라우트 */}
					{/* <Route path="admin/answers">
						<Route index element={<AnswerList />} />
						<Route path="create/:questionId" element={<AnswerCreate />} />
						<Route path="edit/:questionId/:answerId" element={<AnswerEdit />} />
						<Route path="detail/:questionId/:answerId" element={<AnswerDetail />} />
					</Route> */}

					{/* 리뷰 관련 라우트 */}
					{/* <Route path="mypage/reviews">
                    <Route path="create/:productId" element={<ReviewCreate />} />
						<Route path="my-reviews" element={<MyReviews />} />
						<Route path="detail/:productId/:reviewId" element={<ReviewDetail />} />
						<Route path="edit/:productId/:reviewId" element={<ReviewEdit />} />
					</Route> */}

				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
