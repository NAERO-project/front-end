// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { decodeJwt } from "../../utils/tokenUtils";

// // 로그인을 해야 접근이 가능한 페이지는 토큰 만료 시 로그인 화면으로 이동 시키는 로직
// const RequireAuth = ({ children }) => {
//     const navigate = useNavigate();
//     const isLogin = window.localStorage.getItem("accessToken");
//     const decodedToken = decodeJwt(isLogin);

//     useEffect(() => {
//         if (!isLogin || !decodedToken || isTokenExpired(decodedToken)) {
//             alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
//             navigate("/login");
//         }
//     }, [isLogin, decodedToken, navigate]);

//     if (!isLogin || !decodedToken || isTokenExpired(decodedToken)) {
//         return null; // 리다이렉트 중에는 아무것도 렌더링하지 않음
//     }

//     return children;
// };

// function isTokenExpired(decodedToken) {
//     const currentTime = Math.floor(Date.now() / 1000);
//     return decodedToken.exp < currentTime;
// }

// export default RequireAuth;
