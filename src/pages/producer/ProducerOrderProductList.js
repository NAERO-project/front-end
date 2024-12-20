import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import { callProducerOrderProductListApi } from "../../apis/OrderApiCall";
import { callShippingStatusListApi } from "../../apis/ShippingApiCall";
import { callShippingComListApi } from "../../apis/ShippingApiCall";
import DeliveryUpdateModal from "../../components/shipping/DeliveryUpdateModal";
import DeliveryTrackModal from "../../components/shipping/DeliveryTrackModal";
import styles from "./css/ProductOrderProductList.module.css";

function ProducerOrderProductList({ orderId, orderStatus }) {
  const { orderId: routeOrderId } = useParams();
  const effectiveOrderId =
    orderId || routeOrderId || localStorage.getItem("currentOrderId");

  const isLogin = window.localStorage.getItem("accessToken");
  const producerUsername = isLogin ? decodeJwt(isLogin).sub : null;

  const dispatch = useDispatch();

  // Local states for producer products and shipping details
  const [orderProducts, setOrderProducts] = useState([]);
  const [shippingStatus, setShippingStatus] = useState("");
  const [isDeliveryUpdateModalOpen, setIsDeliveryUpdateModalOpen] =
    useState(false);
  const [isDeliveryTrackModalOpen, setIsDeliveryTrackModalOpen] =
    useState(false);
  const [currentShippingId, setCurrentShippingId] = useState(null);
  const [currentTrackingNumber, setCurrentTrackingNumber] = useState(null);
  const [currentShipComName, setCurrentShipComName] = useState(null);
  // console.log("orderStatus_ProducerOrderProductList", orderStatus);

  // Fetch producer order products
  const fetchOrderProducts = async () => {
    try {
      const response = await dispatch(
        callProducerOrderProductListApi({
          orderId: effectiveOrderId,
          producerUsername: producerUsername,
        })
      );

      // console.log("Order Products Response:", response);

      if (response?.length > 0) {
        setOrderProducts(response);

        const shippingId = response[0].shippingId;
        setCurrentShippingId(shippingId);

        const statusResponse = await dispatch(
          callShippingStatusListApi(shippingId)
        );

        // console.log("Shipping Status Response:", statusResponse);

        setShippingStatus(statusResponse?.shippingStatus || "");

        setCurrentTrackingNumber(statusResponse?.trackingNumber || "");

        const shipComList = await dispatch(callShippingComListApi());

        // console.log("Ship Com List:", shipComList);

        if (shipComList?.length > 0) {
          for (let i = 0; i < shipComList.length; i++) {
            if (shipComList[i].shipComId === statusResponse?.shipComId) {
              const shipComName = shipComList[i].shipComName;
              // console.log("Ship Com Name:", shipComName);
              setCurrentShipComName(shipComName);
              break;
            }
          }
        }
      } else {
        // console.warn("No products found for the given order ID.");
      }
    } catch (error) {
      // console.error("Failed to fetch order products:", error);
      alert("조회 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (effectiveOrderId) {
      localStorage.setItem("currentOrderId", effectiveOrderId);
      fetchOrderProducts();
    }
  }, [effectiveOrderId]);

  const handleDeliveryUpdateModalClose = async (success) => {
    setIsDeliveryUpdateModalOpen(false);
    if (success) {
      fetchOrderProducts();
    }
  };

  const handleDeliveryTrackModalClose = () => {
    setIsDeliveryTrackModalOpen(false);
  };

  return (
    <div className={styles["product-list"]}>
      {orderProducts?.length > 0 ? (
        orderProducts.map((product) => (
          <div className={styles["product-item"]} key={product.optionId}>
            <div>
              <img
                className={styles["product-image"]}
                src={product.productImg}
                alt="주문상품 이미지"
              />
            </div>
            <div className={styles["product-info"]}>
              <p className={styles["product-name"]}>{product.productName}</p>
              <p className={styles["product-amount"]}>
                {product.amount.toLocaleString("ko-KR")}&nbsp;원
              </p>
              <p className={styles["product-count"]}>
                {product.count.toLocaleString("ko-KR")}&nbsp;개
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>주문된 상품이 없습니다.</p>
      )}
      <div className={styles["tracking-container"]}>
        <div className={styles["tracking-info"]}>
          {currentTrackingNumber !== null && currentShipComName !== null && (
            <>
              <div className={styles["tracking-number"]}>
                <p>송장번호: {currentTrackingNumber}</p>
              </div>
            </>
          )}
          {currentShipComName !== null && currentTrackingNumber !== null && (
            <>
              <div className={styles["ship-com-name"]}>
                <p>배송회사: {currentShipComName}</p>
              </div>
            </>
          )}
        </div>
        <div className={styles["button-container"]}>
          <button
            className={styles["delivery-button"]}
            onClick={() => setIsDeliveryUpdateModalOpen(true)}
            // disabled={shippingStatus !== "pending"}
            disabled={orderStatus !== "completed"}
          >
            송장등록
          </button>
          <button
            className={styles["delivery-button"]}
            onClick={() => setIsDeliveryTrackModalOpen(true)}
            disabled={shippingStatus !== "sent"}
          >
            배송 조회
          </button>
          {isDeliveryUpdateModalOpen && (
            <DeliveryUpdateModal
              orderId={effectiveOrderId}
              onClose={handleDeliveryUpdateModalClose}
            />
          )}
          {isDeliveryTrackModalOpen && (
            <DeliveryTrackModal
              orderId={effectiveOrderId}
              shippingId={currentShippingId}
              onClose={handleDeliveryTrackModalClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProducerOrderProductList;
