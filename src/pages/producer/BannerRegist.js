import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { callInsertBannerApi } from "../../apis/BannerApiCall";

function BannerRegist(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    // // Form state
    // const [form, setForm] = useState({
        
    // });

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

    // 핸들러
    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    };


    // const onChangeHandler = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const onClickBannerRegistHandler = () => {

        // 이미지가 업로드되지 않았을 경우 경고
        if (!image) {
            alert("상품 이미지를 업로드해주세요.");
            return;
        }

        const formData = new FormData();

        if (image) {
            formData.append("bannerImage", image);
        }

        dispatch(
            callInsertBannerApi({
                form: formData,
                producerUsername: producerUsername,
            })
        );

        alert("등록되었습니다.");
        navigate("/producer/banner-manage", { replace: true });
        // window.location.reload();
    };


    return(
        <div>
            <div>
                <button onClick={onClickBannerRegistHandler}>배너 등록</button>
            </div>
            <div>
                <div>
                    <div>
                        {imageUrl && <img src={imageUrl} alt="preview" />}
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="bannerImg"
                            accept="image/jpg,image/png,image/jpeg,image/gif"
                            onChange={onChangeImageUpload}
                            ref={imageInput}
                        />
                        <button onClick={onClickImageUpload}>
                            배너 이미지 업로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerRegist;