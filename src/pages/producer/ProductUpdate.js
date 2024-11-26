import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { callProductDetailApi, callUpdateProductApi } from "../../apis/ProductApiCall";


function ProductUpdate(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const productDetail = useSelector(state => state.productReducer);

    const [productImage, setProductImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    // const [form, setForm] = useState({});

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    // Form state
    const [form, setForm] = useState({
        productName: "",
        productPrice: 0,
        productCheck: "",
        productQuantity: 0,
        productDesc: "",
        smallCategory: {
            smallCategoryId: "",
            smallCategoryName: "",
            mediumCategoryId: "",
        },
        options: [],
    });


    // Option state
    const [option, setOption] = useState({
        optionDesc: "기본 옵션",
        addPrice: 0,
        optionQuantity: 0,
    });

    const largeCategories = [
        { largeCategoryId: "1", largeCategoryName: "식품" },
        { largeCategoryId: "2", largeCategoryName: "건강&생활" },
        { largeCategoryId: "3", largeCategoryName: "패션" },
    ];

    // State for categories
    const [selectedLargeCategory, setSelectedLargeCategory] = useState(""); // 대분류 선택값

    const [selectedMediumCategory, setSelectedMediumCategory] = useState(""); // 중분류 선택값
    const [mediumCategories, setMediumCategories] = useState([]); // 중분류 리스트

    const [smallCategories, setSmallCategories] = useState([]); // 소분류 리스트

    useEffect(() =>{
        dispatch(callProductDetailApi({
            productId: params.productId
        })
    );
    }, []);

    useEffect(() => {
        // 대분류 선택시 나오는 중분류
        if (selectedLargeCategory) {
            fetch(
                `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/products/medium-categories?largeCategory=${selectedLargeCategory}`
            )
                .then((res) => res.json())
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setMediumCategories(response.data); // 배열 데이터 설정
                    } else {
                        setMediumCategories([]); // 예상치 못한 데이터 구조 처리
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch 중분류 categories:", error);
                    setMediumCategories([]); // 에러 발생 시 초기화
                });
        } else {
            setMediumCategories([]); // 대분류 선택 해제 시 초기화
        }
    }, [selectedLargeCategory]);

    useEffect(() => {
        // 중분류 선택시 나오는 소분류
        if (selectedMediumCategory) {
            fetch(
                `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/products/small-categories?mediumCategory=${selectedMediumCategory}`
            )
                .then((res) => res.json())
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setSmallCategories(response.data); // 배열 데이터 설정
                    } else {
                        setSmallCategories([]); // 예상치 못한 데이터 구조 처리
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch 소분류 categories:", error);
                    setSmallCategories([]); // 에러 발생 시 초기화
                });
        } else {
            setSmallCategories([]); // 중분류 선택 해제 시 초기화
        }
    }, [selectedMediumCategory]);

    // form의 smallCategory.mediumCategoryId를 업데이트하는 useEffect
    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            smallCategory: {
                ...prevForm.smallCategory,
                mediumCategoryId: selectedMediumCategory,
            },
        }));
    }, [selectedMediumCategory]);
    

    // 이미지 미리보기
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

    // 이미지 업로드 핸들러
	const onChangeImageUpload = (e) => {
        setProductImage(e.target.files[0]);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    // 폼 입력값 변경 핸들러
	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

    const onChangeLargeCategoryHandler = (e) => {
        const value = e.target.value;

        setSelectedLargeCategory(value);
        setSelectedMediumCategory(""); // 중분류 초기화
        setSmallCategories([]); // 소분류 초기화
        setForm((prevForm) => ({
            ...prevForm,
            smallCategory: {
                smallCategoryId: "",
                smallCategoryName: "",
                mediumCategoryId: "",
            },
        }));
    };

    const onChangeMediumCategoryHandler = (e) => {
        const value = e.target.value;

        setSelectedMediumCategory(value);
        setSmallCategories([]); // 소분류 초기화
        setForm((prevForm) => ({
            ...prevForm,
            smallCategory: {
                ...prevForm.smallCategory,
                smallCategoryId: "",
                smallCategoryName: "",
            },
        }));
    };

    const onChangeSmallCategoryHandler = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];

        setForm((prevForm) => ({
            ...prevForm,
            smallCategory: {
                ...prevForm.smallCategory,
                smallCategoryId: e.target.value, // 소분류 ID 설정
                smallCategoryName: selectedOption?.text || "", // 소분류 이름 설정
                mediumCategoryId: selectedMediumCategory || "", // 중분류 ID 유지
            },
        }));
    };

    const onChangeOptionHandler = (e) => {
        setOption({
            ...option,
            [e.target.name]: e.target.value,
        });
    };

    const onAddOptionHandler = () => {
        if (
            !option.optionDesc ||
            option.addPrice === null ||
            option.addPrice === undefined ||
            option.optionQuantity === null ||
            option.optionQuantity === undefined
        ) {
            alert("옵션 정보를 모두 입력해주세요.");
            return;
        }

        setForm((prevForm) => ({
            ...prevForm,
            options: [...prevForm.options, { ...option }],
        }));

        setOption({
            optionDesc: "",
            addPrice: 0,
            optionQuantity: 0,
        }); // Reset option form
    };
    

    // 상품 정보 업데이트 핸들러
	const onClickProductUpdateHandler = () => {
		console.log('[ProductUpdate] onClickProductUpdateHandler');

		// FormData 객체 생성 및 데이터 추가
		const formData = new FormData();
		formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productCheck", form.productCheck);
        formData.append("productDesc", form.productDesc);

		// smallCategory 데이터 추가
        formData.append(
            "smallCategory.smallCategoryId",
            form.smallCategory.smallCategoryId
        );
        formData.append(
            "smallCategory.smallCategoryName",
            form.smallCategory.smallCategoryName
        );
        formData.append(
            "smallCategory.mediumCategoryId",
            form.smallCategory.mediumCategoryId
        );

        // 옵션 추가
        form.options.forEach((opt, index) => {
            formData.append(`options[${index}].optionDesc`, opt.optionDesc);
            formData.append(`options[${index}].addPrice`, opt.addPrice);
            formData.append(
                `options[${index}].optionQuantity`,
                opt.optionQuantity
            );
        });
        
        // if (productImage) {
        //     formData.append("productImage", productImage);
        // }

        // formData에 productImage 추가
        formData.append("productImage", productImage);

		// API 호출하여 상품 정보 업데이트
		dispatch(
			callUpdateProductApi({
				form: formData,
                producerUsername: producerUsername,
                productImage: productImage
			})
		);

		console.log("fromData:", Object.fromEntries(formData.entries()));
        alert("상품을 수정했습니다. 상품 페이지로 이동합니다.");
        navigate("/producer/product-manage", { replace: true });
	};

    return(
        <div>
            <div>
                <button onClick={onClickProductUpdateHandler}>
                    상품 수정 저장하기
                </button>
			</div>
            <div>
                <div>
                    <div>
                        {imageUrl && <img src={imageUrl} alt="preview" />}
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="productImg"
                            accept="image/jpg,image/png,image/jpeg,image/gif"
                            onChange={onChangeImageUpload}
                            ref={imageInput}
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
                                    <label>대분류</label>
                                </td>
                                <td>
                                    <select
                                        value={selectedLargeCategory}
                                        onChange={onChangeLargeCategoryHandler}
                                    >
                                        <option value="">대분류 선택</option>
                                        {largeCategories.map((category) => (
                                            <option
                                                key={category.largeCategoryId}
                                                value={category.largeCategoryId}
                                            >
                                                {category.largeCategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>중분류</label>
                                </td>
                                <td>
                                    <select
                                        value={selectedMediumCategory}
                                        onChange={onChangeMediumCategoryHandler}
                                        disabled={!selectedLargeCategory}
                                    >
                                        <option value="" disabled>
                                            중분류 선택
                                        </option>
                                        {mediumCategories.map((category) => (
                                            <option
                                                key={category.mediumCategoryId}
                                                value={
                                                    category.mediumCategoryId
                                                }
                                            >
                                                {category.mediumCategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>소분류</label>
                                </td>
                                <td>
                                    <select
                                        name="smallCategory"
                                        onChange={onChangeSmallCategoryHandler}
                                        disabled={!selectedMediumCategory} // 중분류가 선택되지 않으면 비활성화
                                    >
                                        <option value="">소분류 선택</option>{" "}
                                        {/* 기본 선택 옵션 */}
                                        {Array.isArray(smallCategories) &&
                                            smallCategories.map((category) => (
                                                <option
                                                    key={
                                                        category.smallCategoryId
                                                    }
                                                    value={
                                                        category.smallCategoryId
                                                    } // 소분류 ID를 value로 설정
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
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>상품 가격</label>
                                </td>
                                <td>
                                    <input
                                        name="productPrice"
                                        placeholder="상품 가격"
                                        type="number"
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
                                            onChange={onChangeHandler}
                                        />{" "}
                                        Y
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="productCheck"
                                            value="N"
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
                                        value={option.optionDesc}
                                        onChange={onChangeOptionHandler}
                                    />
                                    <input
                                        name="addPrice"
                                        placeholder="추가 가격"
                                        type="number"
                                        value={option.addPrice}
                                        onChange={onChangeOptionHandler}
                                    />
                                    <input
                                        name="optionQuantity"
                                        placeholder="옵션 수량"
                                        type="number"
                                        value={option.optionQuantity}
                                        onChange={onChangeOptionHandler}
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
                                        {form.options.map((opt, index) => (
                                            <li key={index}>
                                                옵션 내용: {opt.optionDesc} |
                                                추가 가격: {opt.addPrice} |
                                                수량: {opt.optionQuantity}
                                            </li>
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
                                        onChange={onChangeHandler}
                                    ></textarea>
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