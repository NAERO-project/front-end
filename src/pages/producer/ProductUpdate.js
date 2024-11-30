import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { callProductDetailApi, callUpdateProductApi } from "../../apis/ProductApiCall";

function ProductUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const productDetail = useSelector(state => state.productReducer);

    const [productImage, setProductImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

    const isLogin = window.localStorage.getItem("accessToken");
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null;

    const [form, setForm] = useState({
        productName: "",
        productPrice: 0,
        productCheck: "",
        productDesc: "",
        smallCategory: {
            smallCategoryId: "",
            smallCategoryName: "",
            mediumCategoryId: "",
        },
        options: [],
    });

    const [option, setOption] = useState({
        optionDesc: "기본 옵션",
        addPrice: 0,
        optionQuantity: 0,
        optionCheck: "Y"
    });

    // const largeCategories = [
    //     { largeCategoryId: "2", largeCategoryName: "식품" },
    //     { largeCategoryId: "3", largeCategoryName: "헬스&뷰티" },
    //     { largeCategoryId: "4", largeCategoryName: "패션" },
    // ];

    const [selectedLargeCategory, setSelectedLargeCategory] = useState("");
    const [selectedMediumCategory, setSelectedMediumCategory] = useState("");
    const [mediumCategories, setMediumCategories] = useState([]);
    const [smallCategories, setSmallCategories] = useState([]);

    useEffect(() => {
        dispatch(callProductDetailApi({
            productId: params.productId
        }));
    }, [params.productId]);

    useEffect(() => {
        if (productDetail) {
            setForm({
                ...form,
                productName: productDetail.productName,
                productPrice: productDetail.productPrice,
                productCheck: productDetail.productCheck,
                productDesc: productDetail.productDesc,
                smallCategory: productDetail.smallCategory,
                options: productDetail.options,
            });

            setImageUrl(productDetail.productImg || productDetail.productThumbnail);

            const mediumCategoryId = productDetail.smallCategory?.mediumCategoryId || "";
            const smallCategoryId = productDetail.smallCategory?.smallCategoryId || "";

            if (mediumCategoryId) {
                fetch(
                    `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/products/medium-categories?largeCategory=${selectedLargeCategory}`
                )
                    .then((res) => res.json())
                    .then((response) => {
                        if (Array.isArray(response.data)) {
                            setMediumCategories(response.data);
                            setSelectedMediumCategory(mediumCategoryId);

                            const mediumCategory = response.data.find(category => category.mediumCategoryId === mediumCategoryId);
                            if (mediumCategory) {
                                setSelectedLargeCategory(mediumCategory.largeCategoryId);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to fetch 소분류 categories:", error);
                    });
            }

            if (smallCategoryId) {
                fetch(
                    `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/products/small-categories?mediumCategory=${mediumCategoryId}`
                )
                    .then((res) => res.json())
                    .then((response) => {
                        if (Array.isArray(response.data)) {
                            setSmallCategories(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to fetch 소분류 categories:", error);
                    });
            }
        }
    }, [productDetail]);

    useEffect(() => {
        if (selectedLargeCategory) {
            fetch(
                `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/products/medium-categories?largeCategory=${selectedLargeCategory}`
            )
                .then((res) => res.json())
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setMediumCategories(response.data);
                    } else {
                        setMediumCategories([]);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch 소분류 categories:", error);
                    setMediumCategories([]);
                });
        } else {
            setMediumCategories([]);
        }
    }, [selectedLargeCategory]);

    useEffect(() => {
        if (selectedMediumCategory) {
            fetch(
                `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/products/small-categories?mediumCategory=${selectedMediumCategory}`
            )
                .then((res) => res.json())
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setSmallCategories(response.data);
                    } else {
                        setSmallCategories([]);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch 소분류 categories:", error);
                    setSmallCategories([]);
                });
        } else {
            setSmallCategories([]);
        }
    }, [selectedMediumCategory]);

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            smallCategory: {
                ...prevForm.smallCategory,
                mediumCategoryId: selectedMediumCategory,
            },
        }));
    }, [selectedMediumCategory]);

    useEffect(() => {
        if (productImage) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            };
            fileReader.readAsDataURL(productImage);
        }
    }, [productImage]);

    const onChangeImageUpload = (e) => {
        setProductImage(e.target.files[0]);
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

    const onChangeOptionHandler = (e, index) => {
        const { name, value } = e.target;
        const updatedOptions = [...form.options];
        updatedOptions[index] = {
            ...updatedOptions[index],
            [name]: value,
        };
        setForm({
            ...form,
            options: updatedOptions,
        });
    };

    const onChangeOptionInputHandler = (e) => {
        const { name, value } = e.target;
        setOption((prevOption) => ({
            ...prevOption,
            [name]: value,
        }));
    };

    const onAddOptionHandler = () => {
        setForm((prevForm) => ({
            ...prevForm,
            options: [...prevForm.options, { ...option }],
        }));
        setOption({
            optionDesc: "기본 옵션",
            addPrice: 0,
            optionQuantity: 0,
            optionCheck: "Y"
        });
    };

    const onDeleteOptionHandler = (index) => {
        const updatedOptions = form.options.map((opt, i) => {
            if (i === index) {
                return {
                    ...opt,
                    optionCheck: "N"
                };
            }
            return opt;
        });
        setForm((prevForm) => ({
            ...prevForm,
            options: updatedOptions,
        }));
    };

    const onChangeLargeCategoryHandler = (e) => {
        setSelectedLargeCategory(e.target.value);
    };

    const onChangeMediumCategoryHandler = (e) => {
        setSelectedMediumCategory(e.target.value);
    };

    const onChangeSmallCategoryHandler = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            smallCategory: {
                ...prevForm.smallCategory,
                smallCategoryId: e.target.value,
            },
        }));
    };

    const onSaveHandler = () => {
        const formData = new FormData();
        
        formData.append('productId', params.productId);
        formData.append('productName', form.productName);
        formData.append('productPrice', form.productPrice);
        formData.append('productCheck', form.productCheck);
        formData.append('productDesc', form.productDesc);

        formData.append('smallCategory.smallCategoryId', form.smallCategory.smallCategoryId);
        formData.append('smallCategory.smallCategoryName', form.smallCategory.smallCategoryName);
        formData.append('smallCategory.mediumCategoryId', form.smallCategory.mediumCategoryId);

        console.log("뭐가 들었나...", form.options);

        form.options.forEach((opt, index) => {
            formData.append(`options[${index}].optionDesc`, opt.optionDesc);
            formData.append(`options[${index}].addPrice`, opt.addPrice);
            formData.append(`options[${index}].optionQuantity`, opt.optionQuantity);
            formData.append(`options[${index}].optionCheck`, opt.optionCheck);
            if (opt.optionId) {
            formData.append(`options[${index}].optionId`, opt.optionId);
            } else {
                formData.append(`options[${index}].optionId`, "");
            }
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        if (productImage) {
            formData.append('productImage', productImage);
        }

        dispatch(callUpdateProductApi({
            form: formData,
        }));

        alert("상품을 수정했습니다.");
        navigate(`/producer/product-manage`, { replace: true });
    };

    return (
        <div>
            <div>
                <h2>상품 수정</h2>
                <div>
                    <div>
                        {imageUrl && <img src={imageUrl} alt="상품 이미지" />}
                        <input
                            type="file"
                            ref={imageInput}
                            style={{ display: "none" }}
                            onChange={onChangeImageUpload}
                        />
                        <button onClick={onClickImageUpload}>
                            상품 이미지 업로드
                        </button>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>소분류</label>
                                </td>
                                <td>
                                    <select
                                        name="smallCategory"
                                        value={form?.smallCategory?.smallCategoryId}
                                        onChange={onChangeSmallCategoryHandler}
                                        disabled={!selectedMediumCategory}
                                    >
                                        <option value="">소분류 선택</option>
                                        {Array.isArray(smallCategories) &&
                                            smallCategories?.map((category) => (
                                                <option
                                                    key={category.smallCategoryId}
                                                    value={category.smallCategoryId}
                                                >
                                                    {category.smallCategoryName}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>상품 이름</label>
                                </td>
                                <td>
                                    <input
                                        name="productName"
                                        placeholder="상품 이름"
                                        value={form.productName}
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>상푸 가격</label>
                                </td>
                                <td>
                                    <input
                                        name="productPrice"
                                        placeholder="상품 가격"
                                        type="number"
                                        value={form.productPrice}
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
                                            value="Y"
                                            checked={form.productCheck === "Y"}
                                            onChange={onChangeHandler}
                                        />{" "}
                                        Y
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="productCheck"
                                            value="N"
                                            checked={form.productCheck === "N"}
                                            onChange={onChangeHandler}
                                        />{" "}
                                        N
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>옵션 추가</label>
                                </td>
                                <td>
                                    <input
                                        name="optionDesc"
                                        placeholder="옵션 설명"
                                        value={option.optionDesc || ""}
                                        onChange={onChangeOptionInputHandler}
                                    />
                                    <input
                                        name="addPrice"
                                        placeholder="추가 가격"
                                        type="number"
                                        value={option.addPrice || 0}
                                        onChange={onChangeOptionInputHandler}
                                    />
                                    <input
                                        name="optionQuantity"
                                        placeholder="옵션 수량"
                                        type="number"
                                        value={option.optionQuantity || 0}
                                        onChange={onChangeOptionInputHandler}
                                    />
                                    <button onClick={onAddOptionHandler}>
                                        옵션 추가
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <h4>옵션 리스트</h4>
                                    <ul>
                                        {form?.options?.map((opt, index) => (
                                            opt.optionCheck === "Y" && (
                                                <li key={index}>
                                                    <input
                                                        name="optionDesc"
                                                        value={opt.optionDesc}
                                                        onChange={(e) => onChangeOptionHandler(e, index)}
                                                    />
                                                    <input
                                                        name="addPrice"
                                                        type="number"
                                                        value={opt.addPrice}
                                                        onChange={(e) => onChangeOptionHandler(e, index)}
                                                    />
                                                    <input
                                                        name="optionQuantity"
                                                        type="number"
                                                        value={opt.optionQuantity}
                                                        onChange={(e) => onChangeOptionHandler(e, index)}
                                                    />
                                                    <button onClick={() => onDeleteOptionHandler(index)}>삭제</button>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>상품 설명</label>
                                </td>
                                <td>
                                    <textarea
                                        name="productDesc"
                                        placeholder="상품 설명"
                                        value={form.productDesc}
                                        onChange={onChangeHandler}
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button onClick={onSaveHandler}>
                                        상품 수정 저장하기
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductUpdate;