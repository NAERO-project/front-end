import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { callProductRegistAPI } from '../../../apis/ProductApiCall';

function ProductRegist() {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        productName: "",
        productPrice: 0,
        productCheck: "",
        smallCategoryId: "",
        productQuantity: 0,
        productDesc: "",
    });

    useEffect(() => {
        /* 이미지 업로드시 미리보기 세팅 */
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            };
            fileReader.readAsDataURL(image);
        }
    }, [image]);

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickProductRegistHandler = () => {
        const formData = new FormData();

        formData.append('productName', form.productName);
		formData.append('productPrice', form.productPrice);
		formData.append('productOrderable', form.productCheck);
		formData.append('smallCategoryId', form.smallCategoryId);
		formData.append('productQuantity', form.productQuantity);
		formData.append('productDesc', form.productDesc);

        if (image) {
			formData.append('productImg', image);
		}

        dispatch(
			callProductRegistAPI({
				form: formData
			})
		);

		alert('상품 리스트로 이동합니다.');
		navigate('/producer/product-manage', { replace: true });
		window.location.reload();

    };

    return (
        <div>
            <div>
                <div className="">
                    <button onClick={onClickProductRegistHandler}>
                        상품 등록
                    </button>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            {imageUrl && (
                                <img
                                    className=""
                                    src={imageUrl}
                                    alt="preview"
                                />
                            )}
                            <input
                                style={{ display: "none" }}
                                type="file"
                                name="productImg"
                                accept="image/jpg,image/png,image/jpeg,image/gif"
                                onChange={onChangeImageUpload}
                                ref={imageInput}
                            />
                            <button className="" onClick={onClickImageUpload}>
                                상품 이미지 업로드
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>상품이름</label>
                                    </td>
                                    <td>
                                        <input
                                            name="productName"
                                            placeholder="상품 이름"
                                            className=""
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>상품가격</label>
                                    </td>
                                    <td>
                                        <input
                                            name="productPrice"
                                            placeholder="상품 가격"
                                            type="number"
                                            className=""
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>판매 여부</label>
                                    </td>
                                    <td>
                                        <label>
                                            <input
                                                type="radio"
                                                name="productCheck"
                                                onChange={onChangeHandler}
                                                value="Y"
                                            />{" "}
                                            Y
                                        </label>{" "}
                                        &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="productCheck"
                                                onChange={onChangeHandler}
                                                value="N"
                                            />{" "}
                                            N
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>상품 대분류</label>
                                    </td>
                                    <td>
                                        {/* largeCategoryId = 1:식품, 2:건강&뷰티, 3:패션 */}
                                        <label>
                                            <input
                                                type="radio"
                                                name=""
                                                onChange={onChangeHandler}
                                                value="1"
                                            />{" "}
                                            식품
                                        </label>{" "}
                                        &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name=""
                                                onChange={onChangeHandler}
                                                value="2"
                                            />{" "}
                                            건강&뷰티
                                        </label>{" "}
                                        &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name=""
                                                onChange={onChangeHandler}
                                                value="3"
                                            />{" "}
                                            패션
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>상품 중분류</label>
                                    </td>
                                    <td>
                                       {/* 선택한 대분류에 따라 리스트 내용 달라짐 */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>상품 소분류(태그)</label>
                                    </td>
                                    <td>
                                       {/* 선택한 중분류에 따라 리스트 내용 달라짐 */}
                                       <label>
                                            <input
                                                type="radio"
                                                name="smallCategoryId"
                                                onChange={onChangeHandler}
                                                value="1"
                                            />{" "}
                                            소분류1
                                        </label>{" "}
                                        &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="smallCategoryId"
                                                onChange={onChangeHandler}
                                                value="2"
                                            />{" "}
                                            소분류2
                                        </label>{" "}
                                        &nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="smallCategoryId"
                                                onChange={onChangeHandler}
                                                value="3"
                                            />{" "}
                                            소분류3
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>상품 재고</label>
                                    </td>
                                    <td>
                                        <input
                                            placeholder="상품 재고"
                                            type="number"
                                            name="productQuantity"
                                            onChange={onChangeHandler}
                                            className=""
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>상품 설명</label>
                                    </td>
                                    <td>
                                        <textarea
                                            className=""
                                            name="productDesc"
                                            onChange={onChangeHandler}
                                        ></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductRegist;