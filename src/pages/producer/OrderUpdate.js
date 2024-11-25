import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callOrderDetailApi } from "../../apis/OrderApiCall";

function OrderUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const params = useParams();
    const orderDetail = useSelector((state) => state.orderReducer);

    // const [modifyMode, setModifyMode] = useState(false);

    const [form, setForm] = useState({});

    useEffect(() => {
		console.log('[OrderUpdate] orderId : ', params.orderId);

		dispatch(
			callOrderDetailApi({
				orderId: params.orderId
			})
		);
	}, []);

    return (
        <div>
            {orderDetail && (
                <div>
                    <div>
                           {/*  */}
                    </div>
                </div>
            )}
        </div>

    );
}

export default OrderUpdate;