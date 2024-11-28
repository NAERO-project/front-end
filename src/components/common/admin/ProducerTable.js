import { Table } from "react-bootstrap";
import NoInfoGuide from "./NoInfoGuide";
import { useNavigate } from "react-router-dom";
import TableCSS from "./css/UserTableStyle.module.css"

function ProducerTable(props) {
    const { tableInfo } = props;
    const navigate = useNavigate();
    const toDetail = (username) => { 
        navigate(`/admin/producer-detail/${username}`, { replace: false });
    }

    console.log("tableInfo",tableInfo)
    return (<div className={TableCSS.table_box}>{tableInfo && tableInfo.length > 0 ?
        <table className={TableCSS.table_style} >
        <thead>
            <tr>
                <th>회원 번호</th>
                <th>브랜드명</th>
                <th>아이디</th>
                <th>이름</th>
                <th>탈퇴여부</th>
            </tr>
        </thead>
        <tbody>
            {tableInfo.map((value, index, array) => {
                return (<tr className={TableCSS.tr_style}
                    onClick={() => { toDetail(value.username) }}>
                    <td>
                        {value.userId}
                    </td>
                    <td>
                        { value.producerName}
                    </td>
                    <td>
                        {value.username}
                    </td>
                    <td>
                        {value.userFullname}
                    </td>
                    <td>
                        {value.withStatus}
                    </td>
                        
                </tr>)
            }) }
        </tbody>
    </table>
        :
        <NoInfoGuide/>
}
    </div>)
}


export default ProducerTable;