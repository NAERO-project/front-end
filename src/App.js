import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import UserDetail from "./pages/user/UserDetail";
import ProducerDetail from "./pages/user/ProducerDetail";
import ProducerSignup from "./pages/user/ProducerSignup";
import UpdateUser from "./pages/user/UpdateUser";
import UpdateProducer from "./pages/user/UpdateProducer";
import MypageLayout from "./layouts/MypageLayout";

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

					<Route path='product'>{/* 상품관련 페이지 */}</Route>

					<Route path='producer'>
						<Route path='detail' element={<ProducerDetail />} />
						<Route path='update' element={<UpdateProducer />} />
						{/* 판매자 페이지 */}
					</Route>

					<Route path='management'>{/* 관리자들의 관리페이지 */}</Route>

					<Route path='login' element={<Login />} />
					<Route path='signup' element={<Signup />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
