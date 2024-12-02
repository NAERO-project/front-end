import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { useEffect, useState } from "react";
import { callBannerDeleteApi, callProducerBannerApi } from "../../apis/BannerApiCall";
import BannerRegist from "./BannerRegist";
import BannerManageCSS from "./css/BannerManage.module.css";
import ProductMoreCSS from "../products/css/ProductMore.module.css";

function BannerManage(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    const banners = useSelector(state => state.bannerReducer);
    const bannerList = banners.data;

    console.log("bannerList: ", bannerList);

    const pageInfo = banners.pageInfo;

    const [start, setStart] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    // useEffect(() =>{
    //     dispatch();
    // },[]);

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callProducerBannerApi({
                currentPage: currentPage,
                producerUsername: producerUsername,
            })
        );
    }, [currentPage]);

    const onClickProductInsert = () => {
        setModalOpen(true); // 모달 열기
    };

    const handleCloseModal = (success) => {
        setModalOpen(false); // 모달 닫기
        if (success) {
            // 성공적으로 등록된 경우 추가 로직
            dispatch(callProducerBannerApi({ currentPage, producerUsername })); // 배너 목록 새로고침
        }
    };

    // const onClickProductInsert = () => {
    //     navigate("/producer/banner-regist", { replace: false });
    // };



    return(
        <div>
            <div>
                <div></div>
                <button className={BannerManageCSS.create_btn} onClick={onClickProductInsert}>등록</button>
            </div>
            <table>
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
                        {/* <col width="100px" /> */}
                        <col width="350px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="100px" />
                        <col width="80px" />
                        <col width="80px" />
                        <col width="60px" />
                        {/* <col width="80px" /> */}
                        <col width="121px" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>배너번호</th>
                            <th>배너이미지</th>
                            {/* <th>URL</th> */}
                            <th>등록일자</th>
                            <th>등록여부</th>
                            <th>승인자</th>
                            {/* <th></th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bannerList) &&
                            bannerList.map((b) => (
                                <tr
                                    key={b.bannerId}
                                    // onClick={() => onClickTableTr(b.productId)}
                                >
                                    <td>{b.bannerId}</td>
                                    <td>
                                        <img src={b.bannerThumbnail} alt={b.bannerId}/>
                                    </td>
                                    {/* <td>{b.bannerUrl}</td> */}
                                    <td> {b?.bannerCreateAt
                                    ? b.bannerCreateAt
                                          .replace("T", " ")
                                          .replace("Z", "") // "T"를 공백으로, "Z"를 제거
                                    : "정보 없음"}</td>
                                    <td>{b.bannerAcceptStatus}</td>
                                    <td>{b.approverId}</td>
                                    {/* <td></td> */}
                                    <td className={BannerManageCSS.table_banner}>
                                        <button className={BannerManageCSS.delete_btn}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* 모달 컴포넌트 추가 */}
            {isModalOpen && (
                <BannerRegist onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default BannerManage;