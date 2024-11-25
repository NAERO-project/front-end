import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProducerOrderProductList from "./ProducerOrderProductList";

import { callOrderDetailApi } from "../../apis/OrderApiCall";

function OrderUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const orderDetail = useSelector((state) => state.orderReducer);

    // const [modifyMode, setModifyMode] = useState(false);

    const [form, setForm] = useState({});

    const orderList = orderDetail.orderList || [];

    useEffect(() => {
        console.log("[OrderUpdate] orderId : ", params.orderId);

        dispatch(
            callOrderDetailApi({
                orderId: params.orderId,
            })
        );

        console.log("뭘 갖고 왔나???", orderDetail);
    }, []);

    return (
        <div>
            <h2>주문 상세</h2>
            {orderDetail && (
                <div className="">
                    <div className="">
                        <div className="">
                            <ProducerOrderProductList
                                key={params.orderId}
                                orderId={params.orderId}
                            />
                        </div>
                        <div>
                            <button className="" onClick={() => {}}>
                                배송 조회
                            </button>
                        </div>
                    </div>
                    <div className=""></div>
                </div>
            )}
        </div>
    );
}

export default OrderUpdate;
