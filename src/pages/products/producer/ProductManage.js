import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

function ProductManage() {
    const navigate = useNavigate();
	const dispatch = useDispatch();

    const onClickProductInsert = () => {
		navigate('/producer/product-regist', { replace: false });
	};

  return (
    <>
      <div className="">
        <div className="">
            <button onClick={onClickProductInsert}>상품 등록</button>
        </div>
        <table className="">
            {/* 판매자의 상품 리스트 조회하는 부분 */}
        </table>
        <div>
            {/* 페이징 관련 처리하는 부분 */}
        </div>
      </div>
    </>
  );
}

export default ProductManage;