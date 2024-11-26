import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { useEffect, useState } from "react";
import { callProducerBannerApi } from "../../apis/BannerApiCall";

function BannerManage(){

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

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callProducerBannerApi({
                currentPage: currentPage,
                producerUsername: producerUsername,
            })
        );
    }, [currentPage]);

    return(
        <div>
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
                            <th></th>
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
                                    <td>{b.bannerThumbnail}</td>
                                    <td>{b.bannerUrl}</td>
                                    <td>{b.bannerCreateAt}</td>
                                    <td>{b.bannerAcceptStatus}</td>
                                    <td>{b.approverId}</td>
                                    <td></td>
                                    <td>
                                        <button>수정</button>
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