import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from '../../utils/tokenUtils';

import { callProducerProductListPageApi } from "../../apis/ProductApiCall";
import ProductManageCSS from "./css/ProductManage.module.css";
import ButtonCSS from "../../components/common/Button.module.css";

function ProductManage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    const products = useSelector((state) => state.productReducer);
    const productList = products.data;

    const pageInfo = products.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callProducerProductListPageApi({
                currentPage: currentPage,
                producerUsername: producerUsername
            })
        );
    }, [currentPage]);

    const onClickProductInsert = () => {
        navigate("/producer/product-regist", { replace: false });
    };

    const onClickTableTr = (productCode) => {
		// navigate(`/producer/product-update/${productCode}`, { replace: false });
	};

    return (
        <>
            <div className={ProductManageCSS.manage_box}>
                <div className={ProductManageCSS.product_div1}>
                    <div></div>
                    <button className={ButtonCSS.producer_button01} onClick={onClickProductInsert}>등록</button>
                </div>
                
                <table className={ProductManageCSS.manage_table}>
                    {/* 판매자의 상품 리스트 조회하는 부분 */}
                    {/* <colgroup>
                        <col width="5%" />
                        <col width="30%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="10%" />
                    </colgroup> */}

                    <colgroup>
                        <col width="80px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="350px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="80px" />
                        <col width="80px" />
                        <col width="60px" />
                        <col width="80px" />
                        <col width="121px" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>상품가격</th>
                            <th>내용</th>
                            <th>추가가격</th>
                            <th>옵션명</th>
                            <th>카테고리</th>
                            <th>재고</th>
                            <th>판매여부</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(productList) &&
                            productList.map((p) => (
                                <tr
                                    key={p.productId}
                                    onClick={() => onClickTableTr(p.productId)}
                                >
                                    <td>{p.product.productId}</td>
                                    <td>{p.product.productName}</td>
                                    <td>{p.product.productPrice}</td>
                                    <td>{p.productDesc}</td>
                                    <td>{p.addPrice}</td>
                                    <td>{p.optionDesc}</td>
                                    <td>{p.product.smallCategory.smallCategoryName}</td>
                                    <td>{p.optionQuantity}</td>
                                    <td>{p.product.productCheck}</td>
                                    <td></td>
                                    <td></td>
                                    <td className={ProductManageCSS.manage_btns}>
                                        <button className={ButtonCSS.change_button}>수정</button>
                                        <button className={ButtonCSS.delete_button03}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div
                style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Array.isArray(productList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className=""
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={
                                currentPage === num
                                    ? { backgroundColor: "lightgreen" }
                                    : null
                            }
                            className=""
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(productList) && (
                    <button
                        className=""
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === pageInfo.pageEnd ||
                            pageInfo.total == 0
                        }
                    >
                        &gt;
                    </button>
                )}
            </div>
        </>
    );
}

export default ProductManage;
