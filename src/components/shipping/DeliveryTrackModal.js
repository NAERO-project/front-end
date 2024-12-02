import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  callDeliveryInfoApi,
  callShippingComListApi,
  callShippingStatusListApi,
} from "../../apis/ShippingApiCall";
import styles from "./css/DeliveryTrackModal.module.css";
import { LuRocket } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import { BsBox2Heart } from "react-icons/bs";

function DeliveryTrackModal({ orderId, shippingId, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchDeliveryInfo = async () => {
      try {
        setLoading(true);

        // Fetch tracking nuymber and shipComCode
        const shippingStatus = await dispatch(
          callShippingStatusListApi(shippingId)
        );

        // console.log("shippingStatus", shippingStatus);
        // console.log(
        //   "shippingStatus.trackingNumber",
        //   shippingStatus.trackingNumber
        // );

        if (!shippingStatus || !shippingStatus.trackingNumber) {
          throw new Error("Failed to retireve tracking number.");
        }

        const { trackingNumber, shipComId } = shippingStatus;
        setTrackingNumber(trackingNumber);
        // console.log("trackingNumber", shippingStatus.trackingNumber);
        // console.log("shipComId", shippingStatus.shipComId);

        const shipComList = await dispatch(callShippingComListApi());
        const shipComCode = shipComList.find(
          (com) => com.shipComId === shipComId
        )?.shipComCode;

        // console.log("shipComCode", shipComCode);

        if (!shipComCode) {
          throw new Error("Shipping company code not found.");
        }

        // Fetch delivery information
        const deliveryData = await dispatch(
          callDeliveryInfoApi(trackingNumber, shipComCode)
        );

        // console.log("deliveryData", deliveryData);

        if (!deliveryData || deliveryData.status === false) {
          throw new Error(
            deliveryData.msg || "Failed to fetch delivery information."
          );
        }

        setDeliveryInfo(deliveryData);

        // Determin progress based on status
        if (shippingStatus.shippingStatus === "pending") {
          setProgress(0);
        } else if (deliveryData.completeYN === "Y") {
          setProgress(100);
        } else if (shippingStatus.shippingStatus === "sent") {
          setProgress(Math.floor(Math.random() * (75 - 45) + 50));
        }
        // setProgress(70);
      } catch (err) {
        // console.error("Error fetching delivery information:", err.message);
        // navigate(`/producer/order-update/error`, {
        //   state: { errorMessage: err.message },
        // }); // Redirect to ErrorPage
        alert(err.message);
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryInfo();
  }, [dispatch, shippingId, navigate, orderId]);

  const handleClose = () => {
    onClose();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <p className={styles["modal-content-indicator"]}>
          송장번호: {trackingNumber}
        </p>

        {/* Icon container with progress bars underneath */}
        <div className={styles["icon-container"]}>
          {/* Progress bars behind the icons */}
          <div className={styles["progress-bars-container"]}>
            <div className={styles["background-progress-bar"]}></div>
            <div
              className={styles["progress-bar"]}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <button disabled={true} className={styles["icon-button"]}>
            <LuRocket />
          </button>
          <button disabled={true} className={styles["icon-button"]}>
            <BsPersonGear />
          </button>
          <button disabled={true} className={styles["icon-button"]}>
            <BsBox2Heart />
          </button>
        </div>
        {/* Delivery information */}
        <div className={styles["info-container"]}>
          <p className={styles["info-header"]}>시간</p>
          <p className={styles["info-header"]}>현재위치</p>
          <p className={styles["info-header"]}>배송상태</p>
          {deliveryInfo.trackingDetails
            ?.slice()
            .reverse()
            .map((state, index) => (
              <React.Fragment key={index}>
                <p className={styles["info-body"]}>{state.timeString}</p>
                <p className={styles["info-body"]}>{state.where}</p>
                <p className={styles["info-body"]}>{state.kind}</p>
              </React.Fragment>
            ))}
        </div>
        <button className={styles["close-button"]} onClick={handleClose}>
          확인
        </button>
      </div>
    </div>
  );
}

export default DeliveryTrackModal;
