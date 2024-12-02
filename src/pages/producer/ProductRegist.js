import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";

import { callProductRegistAPI } from "../../apis/ProductApiCall";

import ProductManageCSS from "./css/ProductManage.module.css";
import ProductRegistCSS from "./css/ProductRegist.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";

function ProductRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

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
        { largeCategoryId: "2", largeCategoryName: "식품" },
        { largeCategoryId: "3", largeCategoryName: "헬스&뷰티" },
        { largeCategoryId: "4", largeCategoryName: "패션" },
    ];

    // State for categories
    const [selectedLargeCategory, setSelectedLargeCategory] = useState(""); // 대분류 선택값

    const [selectedMediumCategory, setSelectedMediumCategory] = useState(""); // 중분류 선택값
    const [mediumCategories, setMediumCategories] = useState([]); // 중분류 리스트

    const [smallCategories, setSmallCategories] = useState([]); // 소분류 리스트

    // 이미지 미리보기
    useEffect(() => {
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

    // useEffect(() => {
    //     if (form.options.length === 0) {
    //         setForm((prevForm) => ({
    //             ...prevForm,
    //             options: [
    //                 {
    //                     optionDesc: "기본 옵션",
    //                     addPrice: 0,
    //                     optionQuantity: 0,
    //                 },
    //             ],
    //         }));
    //     }
    // }, [form.options]);

    // 핸들러
    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
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

    const onClickProductRegistHandler = () => {
        if (!selectedMediumCategory) {
            alert("중분류를 선택해주세요.");
            return;
        }
        if (!form.smallCategory.smallCategoryId) {
            alert("소분류를 선택해주세요.");
            return;
        }
        if (!form.productName) {
            alert("상품명을 입력해주세요.");
            return;
        }
        if (!form.productPrice) {
            alert("상품 가격을 입력해주세요.");
            return;
        }
        if (!form.productCheck) {
            alert("상품 판매여부를 선택해주세요.");
            return;
        }
        if (!form.productDesc) {
            alert("상품 상세 설명을 적어주세요.");
            return;
        }

        // 이미지가 업로드되지 않았을 경우 경고
        if (!image) {
            alert("상품 이미지를 업로드해주세요.");
            return;
        }

        console.log("현재 옵션 상태:", form.options);

        // 옵션이 하나도 추가되지 않은 경우 경고
        if (!Array.isArray(form.options) || form.options.length === 0) {
            alert("옵션을 최소 1개 이상 추가해주세요.");
            return;
        }

        // // 옵션이 비어 있으면 기본 옵션 생성
        // const options =
        //     form.options.length === 0
        //         ? [
        //               {
        //                   optionDesc: "기본 옵션",
        //                   addPrice: 0,
        //                   optionQuantity: 100,
        //               },
        //           ]
        //         : form.options;

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

        if (image) {
            formData.append("productImage", image);
        }

        dispatch(
            callProductRegistAPI({
                form: formData,
                producerUsername: producerUsername,
            })
        );

        alert("상품 리스트로 이동합니다.");
        navigate("/producer/product-manage", { replace: true });
        // window.location.reload();
    };

    return (
        <div className={ProductManageCSS.manage_box}>
            <div>

            <div className={UserInfoCSS.info}>
				<p>상품 이름</p>
				<div className={UserInfoCSS.txt}>
                <input
                        name="productName"
                        placeholder="상품 이름"
                        onChange={onChangeHandler}
                    />
                </div>
			</div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className={UserInfoCSS.info}>
				<p>상품 가격</p>
				<div className={UserInfoCSS.txt}>
                    <input
                        name="productPrice"
                        placeholder="상품 가격"
                        type="number"
                        onChange={onChangeHandler}
                    />
                </div>
			</div>

            <div>
                <div>
                    <label>판매 여부</label>
                </div>
                <div>
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
                </div>
            </div>
        </div>
            


            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <div>
                        <label>대분류</label>
                    </div>
                    <div>
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
                    </div>
                </div>

                <div>
                    <div>
                        <label>중분류</label>
                    </div>
                    <div>
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
                    </div>
                </div>


                <div>
                    <div>
                        <label>소분류</label>
                    </div>
                    <div>
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
                    </div>
                </div>
            </div> 


            <div className={UserInfoCSS.info}>
				<p>옵션 추가</p>
				<div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                    </div>
                </div>
			</div>

            <div style={{width: '100%'}}>
                <td colSpan="2" style={{width: '100%', borderRadius: '15px', padding: '20px'}}>
                    <h4 style={{fontWeight: '400', color: '#222',}}>옵션 리스트</h4>
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
            </div>

            <div style={{width: '100%', height: '112px', backgroundColor: 'red'}}>
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
                    <button style={{width: '125px', height: '50px', backgroundColor: '#647453'}} onClick={onClickImageUpload}>
                        업로드
                    </button>
                </div>
            </div>

            <div>
                <div>
                    <label>상품 설명</label>
                </div>
                <div>
                    <textarea
                        name="productDesc"
                        placeholder="상품 설명"
                        onChange={onChangeHandler}
                    ></textarea>
                </div>
            </div>


            </div>
            <div>
                <button onClick={onClickProductRegistHandler}> 등록</button>
            </div>
        </div>
    );
}

export default ProductRegist;
