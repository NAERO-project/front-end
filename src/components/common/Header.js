import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { useSelector, useDispatch } from "react-redux";
import { callLogoutAPI } from "../../apis/UserApiCall";
import HeaderCSS from "./Header.module.css";

import { RiLoginCircleLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LuUnlock } from "react-icons/lu";
import { LuDatabase } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineNotificationsActive } from "react-icons/md";

function Header(props) {
  //필요헤더 -> 로그인 전, 로그인 후, 관리자 로그인 후

  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.userReducer); // 저장소에서 가져온 loginMember 정보
  const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
  // const username = decodeJwt(isLogin).sub;

  if (isLogin && decodeJwt(isLogin).exp * 1000 < Date.now()) {
    dispatch(callLogoutAPI());
  }

  //로그아웃
  const onClickLogoutHandler = () => {
    window.localStorage.removeItem("accessToken");
    dispatch(callLogoutAPI());

    alert("로그아웃이 되어 메인화면으로 이동합니다.");
    navigate("/", { replace: true });
    window.location.reload();
  };

  function commonHeader(additionalContent) {
    const imagePath = process.env.PUBLIC_URL + "/neroLogo.png";

    return (
      <div className={HeaderCSS.HeaderBar}>
        <div className={HeaderCSS.HeaderContent}>
          <div className={HeaderCSS.LogoImage}>
            <NavLink to="/">
              <img src={imagePath} alt="NeroLogo" />
            </NavLink>
          </div>
          {additionalContent && (
            <div className={HeaderCSS.NavLinkContainer}>
              {additionalContent}
            </div>
          )}
        </div>
      </div>
    );
  }

  function BeforeLogin() {
    const additionalContent = (
      <>
        <div className={HeaderCSS.NavLinkItem}>
          <RiLoginCircleLine className={HeaderCSS.Icon} />
          <NavLink to="/login">로그인</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <LuUnlock className={HeaderCSS.Icon} />
          <NavLink to="/signup">회원가입</NavLink>
        </div>
      </>
    );

    return commonHeader(additionalContent);
  }

  function AfterUserLogin() {
    // const username = loginUser.;
    console.log("로그인 유저", loginUser);
    let userFullname = window.localStorage.getItem("userFullName");
    const isProducer = decodeJwt(isLogin).auth.some((a) =>
      /ROLE_PRODUCER/.test(a)
    );
    const isAdmin = decodeJwt(isLogin).auth.some((a) =>
      /ROLE_.*_ADMIN/.test(a)
    );

    console.log(isAdmin);
    if (isAdmin) {
      return AdminLogin(userFullname);
    }

    const additionalContent = (
      <>
        <div className={HeaderCSS.NavLinkItem}>
          <LuDatabase className={HeaderCSS.Icon} />
          {isProducer && (
            <NavLink to="/producer/product-manage">판매자 페이지</NavLink>
          )}
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <LuUser2 className={HeaderCSS.Icon} />
          <NavLink to="/mypage/detail">{userFullname}님</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <LuShoppingCart className={HeaderCSS.Icon} />
          <NavLink to="/cart">장바구니</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <MdOutlineNotificationsActive className={HeaderCSS.Icon} />
          <NavLink to="/register">알림</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <RiLogoutCircleLine className={HeaderCSS.Icon} />
          <button
            className={HeaderCSS.LogoutButton}
            onClick={onClickLogoutHandler}
          >
            로그아웃
          </button>
        </div>
      </>
    );

    return commonHeader(additionalContent);
  }

  // 관리자 로그인
  function AdminLogin(userFullname) {
    const additionalContent = (
      <>
        <div className={HeaderCSS.NavLinkItem}>
          <LuDatabase className={HeaderCSS.Icon} />
          <NavLink to="/admin/dashboard">관리자 페이지</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <LuUser2 className={HeaderCSS.Icon} />
          <NavLink to="/mypage/detail">{userFullname}님</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <LuShoppingCart className={HeaderCSS.Icon} />
          <NavLink to="/login">장바구니</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <MdOutlineNotificationsActive className={HeaderCSS.Icon} />
          <NavLink to="/register">알림</NavLink>
        </div>
        <div className={HeaderCSS.NavLinkItem}>
          <RiLogoutCircleLine className={HeaderCSS.Icon} />
          <button
            className={HeaderCSS.LogoutButton}
            onClick={onClickLogoutHandler}
          >
            로그아웃
          </button>
        </div>
      </>
    );

    return commonHeader(additionalContent);
  }

  // 아래 조건 위치 (boolean위치) 에 들어가야할 값 :로그인 여부, role 확인,
  return <div>{!isLogin ? BeforeLogin() : AfterUserLogin()}</div>;
}

export default Header;