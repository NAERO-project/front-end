import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { useEffect, useState } from "react";
import { callBannerDeleteApi, callProducerBannerApi } from "../../apis/BannerApiCall";

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
        navigate("/producer/banner-regist", { replace: false });
    };



    return(
        <div>
            <div>
                <div></div>
                <button onClick={onClickProductInsert}>등록</button>
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
                                    <td>
                                        <button>삭제</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
        </div>
    );
}

export default BannerManage;