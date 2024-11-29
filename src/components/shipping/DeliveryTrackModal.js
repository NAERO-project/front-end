import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  callDeliveryInfoApi,
  callShippingComListApi,
  callShippingStatusListApi,
} from "../../apis/ShippingApiCall";
import styles from "./css/DeliveryTrackModal.module.css";
import { LuRocket } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import { BsBox2Heart } from "react-icons/bs";

function DeliveryTrackModal({ shippingId, onClose }) {
  const dispatch = useDispatch();

  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        setTrackingNumber(shippingStatus.trackingNumber);

        if (!shippingStatus || !shippingStatus.trackingNumber) {
          throw new Error("Failed to retireve tracking number.");
        }

        const { trackingNumber, shipComId } = shippingStatus;
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
        if (!deliveryData) {
          throw new Error("Failed to fetch delivery information.");
        }

        console.log("deliveryData", deliveryData);

        setDeliveryInfo(deliveryData);

        // Determin progress based on status
        if (shippingStatus.shippingStatus === "pending") {
          setProgress(0);
        } else if (deliveryData.completeYN === "Y") {
          setProgress(100);
        } else if (shippingStatus.shippingStatus === "sent") {
          setProgress(Math.floor(Math.random() * (75 - 25) + 25));
        }
        // setProgress(70);
      } catch (err) {
        console.error("Error fetching delivery information:", err);
        setError(err.message || "Error fetching delivery information.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryInfo();
  }, [dispatch, shippingId]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
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
              <button className={styles["icon-button"]}>
                <LuRocket />
              </button>
              <button className={styles["icon-button"]}>
                <BsPersonGear />
              </button>
              <button className={styles["icon-button"]}>
                <BsBox2Heart />
              </button>
            </div>

            {/* Delivery information */}
            <div className={styles["info-container"]}>
              <p className={styles["info-header"]}>시간</p>
              <p className={styles["info-header"]}>현재위치</p>
              <p className={styles["info-header"]}>배송상태</p>
              {deliveryInfo.trackingDetails
                .slice()
                .reverse()
                .map((state, index) => (
                  <>
                    <p className={styles["info-body"]} key={`time-${index}`}>
                      {state.timeString}
                    </p>
                    <p className={styles["info-body"]} key={`where-${index}`}>
                      {state.where}
                    </p>
                    <p className={styles["info-body"]} key={`kind-${index}`}>
                      {state.kind}
                    </p>
                  </>
                ))}
            </div>
            <button className={styles["close-button"]} onClick={handleClose}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DeliveryTrackModal;
