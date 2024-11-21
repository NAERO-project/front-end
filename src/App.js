import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import UserDetail from "./pages/user/UserDetail";
import ProducerDetail from "./pages/user/ProducerDetail";
import ProducerSignup from "./pages/user/ProducerSignup";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />

					<Route path='product'>{/* 상품관련 페이지 */}</Route>
					<Route path='mypage'>
						<Route path='detail' element={<UserDetail />} />
						<Route path='toproducer' element={<ProducerSignup />}></Route>
						{/* 회원들의 마이페이지 */}
					</Route>

					<Route path='producer'>
						<Route path='detail' element={<ProducerDetail />} />
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
