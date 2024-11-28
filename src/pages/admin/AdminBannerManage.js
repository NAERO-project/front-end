import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callAdminBannerApi } from "../../apis/BannerApiCall";

function AdminBannerManage(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const params = useParams();
    // const bannerId = params.bannerId;

    const banners = useSelector(state => state.bannerReducer);
    const bannerList = banners.data;

    console.log("bannerList: ", bannerList);
    // console.log("bannerId", bannerId);

    const pageInfo = banners.pageInfo;

    // const [start, setStart] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
            fetchData();
        },[]);

    const fetchData=()=>{
        dispatch(callAdminBannerApi({
            currentPage: currentPage
        }))
    }

    const onClickBannerUpdate = (bannerId) =>{
        navigate(`/admin/banner-update/${bannerId}`)
    }

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
                            <th>배너번호</th>
                            <th>배너이미지</th>
                            <th>URL</th>
                            <th>등록일자</th>
                            <th>등록여부</th>
                            <th>승인자</th>
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
                                        <button onClick={() =>onClickBannerUpdate(b.bannerId)}>등록</button>
                                        <button>삭제</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
        </div>
    );
}

export default AdminBannerManage;