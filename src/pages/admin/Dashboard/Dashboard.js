import TodayStatistics from "./TodayStatistics";
import SalesStatistics from "./SalesStatistics";
import TopSales from "./TopSales";
import LikedStatistics from "./LikedStatistics";
import TopLiked from "./TopLiked";

function Dashboard() {

    // TO CODE THE LOGIC FOR THE DASHBOARD

    return (
        <>
            <h4>24시간 통계: </h4>
            <div>
                <TodayStatistics />
            </div>
            <h4>브랜드/상품별 매출 통계: </h4>
            <div>
                <SalesStatistics />
            </div>
            <h4>매출 통계 TOP 1: </h4>
            <div>
                <TopSales />
            </div>
            <h4>브랜드/상품별 선호도 통계: </h4>
            <div>
                <LikedStatistics />
            </div>
            <h4>선호도 통계 TOP 1: </h4>
            <div>
                <TopLiked />
            </div>
        </>
    )
}

export default Dashboard;