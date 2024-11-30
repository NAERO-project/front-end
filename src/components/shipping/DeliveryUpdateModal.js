import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import {
  callShippingComListApi,
  callShippingUpdateApi,
} from "../../apis/ShippingApiCall";
import { callProducerOrderProductListApi } from "../../apis/OrderApiCall";
import styles from "./css/DeliveryUpdateModal.module.css";

function DeliveryUpdateModal({ orderId, onClose }) {
  const dispatch = useDispatch();
  const orderProducts = useSelector(
    (state) => state.orderReducer.producerProducts
  );

  // 배송회사 목록
  const shipComList = useSelector((state) => state.shipping.shipComList);

  const isLogin = window.localStorage.getItem("accessToken");
  const producerUsername = isLogin ? decodeJwt(isLogin).sub : null;

  const [form, setForm] = useState({
    shippingId: 0,
    trackingNumber: "",
    shippingStatus: "sent",
    orderId: orderId,
    shipComId: "",
  });

  const [error, setError] = useState({
    shipComId: "",
    trackingNumber: "",
  });

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        await dispatch(
          callProducerOrderProductListApi({ orderId, producerUsername })
        );
        if (orderProducts.length > 0) {
          setForm((prev) => ({
            ...prev,
            shippingId: orderProducts[0].shippingId,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch order products:", error);
      }
    };
    fetchOrderProducts();
  }, [dispatch, orderId, producerUsername]);

  useEffect(() => {
    if (!shipComList || shipComList.length === 0) {
      dispatch(callShippingComListApi());
    }
    console.log("[DeliveryUpdateModal] shipComList : ", shipComList);
    console.log("[DeliveryUpdateModal] form : ", form);
  }, [dispatch, shipComList]);

  useEffect(() => {
    console.log("[DeliveryUpdateModal] form updated:", form);
  }, [form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 송장번호 입력 시 에러 메시지 초기화
    if (name === "trackingNumber" && value) {
      setError((prev) => ({ ...prev, trackingNumber: "" }));
    }
    // 배송회사 선택 시 에러 메시지 초기화
    if (name === "shipComId" && value) {
      setError((prev) => ({ ...prev, shipComId: "" }));
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    // Validate inputs
    if (!form.shipComId) {
      setError((prev) => ({
        ...prev,
        shipComId: "배송회사를 선택해주세요.",
      }));
      hasError = true;
    }

    if (!form.trackingNumber) {
      setError((prev) => ({
        ...prev,
        trackingNumber: "송장번호를 입력해주세요.",
      }));
      hasError = true;
    }

    if (hasError) return; // Prevent API call if validation fails

    try {
      // Dispatch the update API and check its result
      const response = await dispatch(callShippingUpdateApi(form));
      console.log("[DeliveryUpdateModal 뭔지 진짜 궁금] response : ", response);
      if (response === 200) {
        alert("송장등록이 성공적으로 완료되었습니다.");
        onClose(true); // Notify parent of success
      } else {
        throw new Error("API 호출 실패"); // Simulate a failure if the response isn't as expected
      }
    } catch (error) {
      console.error("송장등록 에러:", error);
      alert("배송 상태 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      onClose(false); // Notify parent of failure
    }
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["input-container"]}>
          <label>송장번호</label>
          <div className={styles["vertical-line"]}></div>
          <input
            type="text"
            name="trackingNumber"
            value={form.trackingNumber}
            onChange={handleInputChange}
          />
        </div>
        {error.trackingNumber && (
          <div className={styles["error-message"]}>{error.trackingNumber}</div>
        )}
        <div className={styles["input-container"]}>
          <label>배송회사</label>
          <div className={styles["vertical-line"]}></div>
          <select
            name="shipComId"
            value={form.shipComId}
            onChange={handleInputChange}
          >
            <option value="">배송회사 선택</option>
            {shipComList.map((company) => (
              <option key={company.shipComId} value={company.shipComId}>
                {company.shipComName}
              </option>
            ))}
          </select>
        </div>
        {error.shipComId && (
          <div className={styles["error-message"]}>{error.shipComId}</div>
        )}
        <div className={styles["execute-button-container"]}>
          <button className={styles["sub-button"]} onClick={handleSubmit}>
            등록
          </button>
          <button
            className={styles["sub-button"]}
            onClick={() => onClose(false)} // Close modal without success
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryUpdateModal;
