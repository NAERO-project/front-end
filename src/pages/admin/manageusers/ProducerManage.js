import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterSearchInput from "../../../components/common/admin/FilterSearchInput";
import FilterToggle from "../../../components/common/admin/FilterToggle";
import { callProducerSearch } from "../../../apis/ManageApiCall";
import ProducerTable from "../../../components/common/admin/css/ProducerTable";
import TablePagenation from "../../../components/common/admin/TablePagenation";


const keywords = { "a.producer_id": "회원 번호" , "a.producer_name":"브랜드명" ,"b.username": "아이디" ,  "b.user_fullname": "이름" }
//필터를 동적으로 바꾸려면 시간이 조금 걸림. 일단 하드코딩 해두기
const filters = { "a.grade_id": { name: "회원 등급", value: { "1": "초보 사장님", "2": "중수 사장님", "3": "고수 사장님", "4": "최고의 사장님" } }, "a.with_status": { name: "영업 여부", value: { "Y": "탈퇴하지 않음", "N": "탈퇴함" } } } 



function ProducerManage(props) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [change, setChange] = useState(false)
    const tableInfo = useSelector(state => state.manageTableReducer);
    
    console.log("data",tableInfo)
    // console.log("chage확인",change)


    const [searchedForm, setSerchedForm] = useState({
        filter:{},
        keyword:{"a.producer_id":""},
        critColum:"a.producer_id",
        asc : true
    });
    const clickSearchBtn = () => {
        setSerchedForm(form)
        setPage(1);
        dispatch(callProducerSearch({ form: form, currentPage: page }));
        setChange(false)
    }
    
    const [form, setForm] = useState({
		filter:{},
        keyword:{"a.producer_id":""},
        critColum:"a.producer_id",
        asc : true
    });
    

    useEffect(() => { 
        dispatch(callProducerSearch({ form: form, currentPage: page }))
        setSerchedForm(form)
    }, [])
    
    useEffect(() => {
        const isSame = JSON.stringify(form) === JSON.stringify(searchedForm);
        console.log("isSame확인",isSame)
            setChange(!isSame);
    }, [form, searchedForm]);
    
    useEffect(() => { 
        dispatch(callProducerSearch({ form: searchedForm, currentPage: page }))
    }, [page])
    
    return (
        <div>
            { (change === true) ? <h3>필터에 변동이 있습니다.</h3>:null}
            <FilterSearchInput keywords={ keywords} state={form} setState={setForm} handler={ clickSearchBtn } />
            <FilterToggle filters={ filters } state={form} setState={setForm}/>
            <ProducerTable tableInfo={tableInfo.data} />
            <TablePagenation curpage={page} totalpage={tableInfo.totalpage } setState={ setPage}></TablePagenation>
        </div>
    );
}

export default ProducerManage;