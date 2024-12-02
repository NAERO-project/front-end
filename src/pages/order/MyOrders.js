import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import OrderProductList from "./OrderProductList";

import { callMyPageOrderListApi } from "../../apis/OrderApiCall";

import MyOrderCSS from "./css/MyOrder.module.css";
import ProductMoreCSS from "../products/css/ProductMore.module.css";
import Footer from "../../components/common/Footer";

function MyOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
  const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

  const orders = useSelector((state) => state.orderReducer);
  const orderList = orders.data || [];

  // 페이징 관련 코드
  const pageInfo = orders.pageInfo;

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(1);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null); // 에러 초기화
      try {
        if (username) {
          console.log(
            "Fetching orders for username:",
            username,
            "and currentPage:",
            currentPage
          );
          await dispatch(callMyPageOrderListApi({ currentPage, username }));
        }
      } catch (err) {
        setError("주문 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch, currentPage, username]);

  const onClickOrderDetailHandler = (orderId) => {
    console.log("Button clicked with orderId:", orderId);
    navigate(`/mypage/order-detail/${orderId}`);
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 UI
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 표시할 UI
  }

  return (
    <>
      <div className={MyOrderCSS.box}>
        <table className={MyOrderCSS.my_table}>
          <colgroup>
            <col width="40%" />
            <col width="10%" />
            <col width="40%" />
            <col width="20%" />
          </colgroup>
          <tbody className={MyOrderCSS.my_tbody}>
            {orderList &&
              orderList.map((order) => {
                console.log("왜이래진짜.........:", order.orderId);
                return (
                  <tr key={order.orderId}>
                    <td>
                      <div>
                      주문 번호: {order.orderId}
                      </div>
                      <div>
                      총 결제 금액:{" "}
                      {order.orderTotalAmount.toLocaleString("ko-KR")}원
                      {/* <hr
                                                style={{ border: "1px solid #000" }}
                                            />
                                            <br />
                                            <OrderProductList
                                                key={order.orderId}
                                                orderId={order.orderId}
                                            />
                                            <br /> */}
                      </div>
                    </td>
                    <td>
                      {order.orderStatus === "completed"
                        ? "주문완료"
                        : order.orderStatus === "canceled"
                        ? "주문취소"
                        : ""}
                    </td>
                    <td>
                      주문 일시:{" "}
                      {order.createdAt
                        ? order.createdAt.replace("T", " ").replace("Z", "") // "T"를 공백으로, "Z"를 제거
                        : "정보 없음"}
                    </td>
                    <td>
                      <button
                        style={{width: '130px', height: '50px', fontSize: '18px', borderRadius: '5px', color:'#fff', backgroundColor: '#647453'}}
                        className={MyOrderCSS.detail_btn}
                        onClick={() => onClickOrderDetailHandler(order.orderId)}
                      >
                        주문 상세
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className={ProductMoreCSS.product_paging} style={{padding: '50px 0 0 0'}}>
      {Array.isArray(orderList) && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className=""
          >
            &lt;
          </button>
        )}
        {pageNumber.map((num) => (
          <li key={num} 
          style={
            currentPage === num
                ? { backgroundColor: "#546E7A" }
                : null
          }
          onClick={() => setCurrentPage(num)}>
            <button
              style={
                currentPage === num
                    ? { color: "#fff", fontWeight: '500' }
                    : null
            }
              className=""
            >
              {num}
            </button>
          </li>
        ))}
        {Array.isArray(orderList) && (
          <button
            className=""
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
          >
            &gt;
          </button>
        )}
      </div>
    </>
  );
}

export default MyOrders;
