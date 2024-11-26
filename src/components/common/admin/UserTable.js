import { Table } from "react-bootstrap";
import NoInfoGuide from "./NoInfoGuide";
import { useNavigate } from "react-router-dom";
function UserTable(props) {
    const { tableInfo } = props;
    const navigate = useNavigate();
    const toDetail = (username) => {
        navigate(`/admin/user-detail/${username}`, { replace: false });
    }

    console.log(tableInfo)
    return (<>{tableInfo && tableInfo.length>0? <Table striped bordered  >
        <thead>
            <tr>
                <th>회원 번호</th>
                <th>아이디</th>
                <th>이름</th>
                <th>탈퇴여부</th>
            </tr>
        </thead>
        <tbody>
            {tableInfo.map((value, index, array) => {
                return (<tr onClick={() => {toDetail(value.username)}
}>
                    <td>
                        {value.userId}
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
    </Table>
        :
        <NoInfoGuide/>
        
}
    </>)
}

export default UserTable;