import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import MainList from "./pages/products/MainList";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />

					<Route path='products'>
						<Route path="preview" element={ <MainList/> }/>
						<Route path="preview/:category" element={ <MainList/> }/>
					</Route>

					<Route path='mypage'>{/* 회원들의 마이페이지 */}</Route>

					<Route path='producer'>{/* 판매자 페이지 */}</Route>

					<Route path='management'>{/* 관리자들의 관리페이지 */}</Route>

					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;