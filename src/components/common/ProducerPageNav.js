import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function SellerPageNavBar() {
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    if (
		token === undefined ||
		token === null ||
		token.exp * 1000 < Date.now()
	) {
		return <Navigate to="/" />;
	}

    return (
        <div>
            <ul>
                <li>
                    <NavLink to="producer/product">상품관리</NavLink>
                </li>
                <li>
                    <NavLink to="producer/order">주문관리</NavLink>
                </li>
                <li>
                    <NavLink to="producer/coupon">쿠폰관리</NavLink>
                </li>
                <li>
                    <NavLink to="producer/banner">배너관리</NavLink>
                </li>
            </ul>
        </div>
    );

}

export default SellerPageNavBar;