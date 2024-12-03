import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterSearchInput from "../../../components/common/admin/FilterSearchInput";
import FilterToggle from "../../../components/common/admin/FilterToggle";
import UserTable from '../../../components/common/admin/UserTable';
import { callUserSearch } from "../../../apis/ManageApiCall";
import TablePagenation from "../../../components/common/admin/TablePagenation";

const keywords = { user_id: "회원 번호" ,  username: "아이디" ,  user_fullname: "이름" }
//필터를 동적으로 바꾸려면 시간이 조금 걸림. 일단 하드코딩 해두기
const filters = { grade_id: { name: "회원 등급", value: { "1": "새싹", "2": "묘목", "3": "나무", "4": "거목" } }, with_status: { name: "탈퇴 여부", value: { "Y": "탈퇴함", "N": "탈퇴하지 않음" } } } 



function UserManage(props) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [change, setChange] = useState(false)
    const tableInfo = useSelector(state => state.manageTableReducer);
    
    console.log("data",tableInfo)
    // console.log("chage확인",change)


    const [searchedForm, setSerchedForm] = useState({
        filter:{},
        keyword:{user_id:""},
        critColum:"user_id",
        asc : true
    });
    const clickSearchBtn = () => {
        setSerchedForm(form)
        setPage(1);
        dispatch(callUserSearch({ form: form, currentPage: page }));
        setChange(false)
    }
    
    const [form, setForm] = useState({
		filter:{},
        keyword:{user_id:""},
        critColum:"user_id",
        asc : true
    });
    

    useEffect(() => { 
        dispatch(callUserSearch({ form: form, currentPage: page }))
        setSerchedForm(form)
    }, [])
    
    useEffect(() => {
        const isSame = JSON.stringify(form) === JSON.stringify(searchedForm);
        console.log("isSame확인",isSame)
            setChange(!isSame);
    }, [form, searchedForm]);
    
    useEffect(() => { 
        dispatch(callUserSearch({ form: searchedForm, currentPage: page }))
    }, [page])
    
    return (
        <div>
            { (change === true) ? <h3>필터에 변동이 있습니다.</h3>:null}
            <FilterSearchInput keywords={ keywords} state={form} setState={setForm} handler={ clickSearchBtn } />
            <FilterToggle filters={ filters } state={form} setState={setForm}/>
            <UserTable tableInfo={tableInfo.data} />
            <TablePagenation curpage={page} totalpage={tableInfo.totalpage } setState={ setPage}></TablePagenation>
        </div>
    );
}

export default UserManage;