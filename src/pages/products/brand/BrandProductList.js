import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callProducerListApi } from "../../../apis/ProductApiCall";
import BrandList from "../../../components/common/products/brand/BrandList";
import BrandProductListCSS from "./css/BrandProductList.module.css";
import BrandBanner from "../../banner/BrandBanner";

function BrandProductList() {
    const dispatch = useDispatch();
    const { producerId } = useParams();

    const brandList = useSelector(state => state.productProducerReducer || []);
    console.log("brandList 브랜드:", brandList);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [producerId]);

    const fetchData = () => {
        dispatch(callProducerListApi()); // 브랜드 목록 가져오기
    };

    // 중복된 producerId를 가진 브랜드를 필터링
    const uniqueProducers = Array.from(new Set(brandList.map(brand => brand.producerId)))
        .map(id => {
            return brandList.find(brand => brand.producerId === id);
        });

    return (
        <>
            <div className={BrandProductListCSS.brand_box}>
                <div>
                    {Array.isArray(uniqueProducers) && uniqueProducers.map((brand) => (
                        <BrandList key={brand.producerId} brand={brand} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default BrandProductList;
