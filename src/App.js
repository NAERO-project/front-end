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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />

                    <Route path="products">
                        <Route path="preview" element={<MainList />} />
                        <Route path="preview/food" element={<MainFoodList />} />
                        <Route path="preview/beauty" element={<MainBeautyList />} />
                        <Route path="preview/fashion" element={<MainFashionList />} />
                        <Route path="more" element={<ProductMore />} />
                        <Route path="more/:mediumId" element={<ProductMore />} />
                        <Route path=":productId" element={<ProductDetail />} />
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

                    <Route path="management">
                        {/* 관리자들의 관리페이지 */}
                    </Route>

                    <Route path="login" element={<Login />} />

                    {/* 1:1 문의 관련 라우트 */}
                    <Route path="questions">
                        <Route index element={<QuestionList />} /> {/* 문의 목록 */}
                        <Route path="create" element={<QuestionCreate />} /> {/* 문의 생성 */}
                        <Route path="edit/:questionId" element={<QuestionEdit />} /> {/* 문의 수정 */}
                        <Route path="detail/:questionId" element={<QuestionDetail />} /> {/* 문의 상세 */}
                    </Route>

                    {/* 1:1 답변 관련 라우트 */}
                    <Route path="answers">
                        <Route index element={<AnswerList />} /> {/* 답변 목록 */}
                        <Route path="create/:questionId" element={<AnswerCreate />} /> {/* 답변 생성 */}
                        <Route path="edit/:questionId/:answerId" element={<AnswerEdit />} /> {/* 답변 수정 */}
                        <Route path="detail/:questionId/:answerId" element={<AnswerDetail />} /> {/* 답변 상세 */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
