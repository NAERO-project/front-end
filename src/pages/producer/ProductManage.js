import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from '../../utils/tokenUtils';

import { callProducerProductListPageApi } from "../../apis/ProductApiCall";
import ProductManageCSS from "./css/ProductManage.module.css";
import ButtonCSS from "../../components/common/Button.module.css";
import ProductMoreCSS from "../products/css/ProductMore.module.css";

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
                producerUsername: producerUsername,
            })
        );
    }, [currentPage]);

    useEffect(() => {
        console.log("productList", productList);
    }, [products]);

    const onClickProductInsert = () => {
        navigate("/producer/product-regist", { replace: false });
    };

    const onClickProductUpdate = (productId)=>{
        navigate(`/producer/product-modify/${productId}`, {replace: false});
        // navigate(`/producer/product-modify`, {replace: false});
    }

    // const onClickTableTr = (productId) => {
	// 	navigate(`/producer/product-update/${productId}`, { replace: false });
	// };

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
                        <col width="5%" />
                        <col width="7%" />
                        <col width="8%" />
                        <col width="25%" />
                        {/* <col width="15%" /> */}
                        <col width="8%" />
                        <col width="5%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>상품가격</th>
                            <th>내용</th>
                            {/* <th>상품사진</th> */}
                            <th>카테고리</th>
                            <th>판매여부</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={ProductManageCSS.producer_tbody}>
                        {Array.isArray(productList) &&
                            productList.map((p) => (
                                <tr
                                    key={p.productId}
                                    // onClick={() => onClickTableTr(p.productId)}
                                >
                                    <td>{p.productId}</td>
                                    <td>{p.productName}</td>
                                    <td>{p.productPrice}</td>
                                    <td>{p.productDesc}</td>
                                    {/* <td><img src={p.productImage} alt="상품사진" /></td> */}
                                    {/* <td>{p.addPrice}</td>
                                    <td>{p.optionDesc}</td> */}
                                    <td>{p.smallCategory.smallCategoryName}</td>
                                    <td>{p.productCheck}</td>
                                    <td className={ProductManageCSS.manage_btns}>
                                        <button className={ButtonCSS.change_button} onClick={() =>{onClickProductUpdate(p.productId)}}>수정</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={ProductMoreCSS.product_paging} style={{padding: '50px 0 0 0'}}>
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
                    <li key={num}
                    style={
                        currentPage === num
                            ? { backgroundColor: "#647453" }
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
