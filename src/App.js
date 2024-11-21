import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import Question from "./pages/questions/Question";
import QuestionCreate from "./pages/questions/QuestionCreate"; // 문의 등록 페이지
import QuestionDetail from "./pages/questions/QuestionDetail"; // 문의 상세 페이지
import QuestionEdit from "./pages/questions/QuestionEdit"; // 문의 수정 페이지

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />

					<Route path='product'>{/* 상품관련 페이지 */}</Route>
					<Route path='mypage'>{/* 회원들의 마이페이지 */}</Route>
					<Route path='questions' element={<Question />} /> {/* 1:1 문의 페이지 추가 */}
					<Route path='questions/create' element={<QuestionCreate />} /> {/* 문의 등록 페이지 추가 */}
					<Route path='questions/:questionId' element={<QuestionDetail />} /> {/* 문의 상세 페이지 추가 */}
					<Route path='questions/edit/:questionId' element={<QuestionEdit />} /> {/* 문의 수정 페이지 추가 */}

					<Route path='producer'>{/* 판매자 페이지 */}</Route>
					<Route path='management'>{/* 관리자들의 관리페이지 */}</Route>

					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;