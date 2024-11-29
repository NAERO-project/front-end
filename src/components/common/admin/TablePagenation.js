import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';


function TablePagenation(props) {
    const { curpage, totalpage, setState } = props;

  const handlePageClick = (page) => {
    setState(page); // 선택한 페이지를 업데이트
  };
  console.log(totalpage)
  const startPage = Math.max(1, curpage - 2);
  const endPage = Math.min(totalpage, curpage + 2);

  return (
    <Pagination  >
    {curpage > 5 && (
        <Pagination.Prev onClick={() => handlePageClick(Math.max(curpage - 5, 1))}>
            -5
        </Pagination.Prev>
    )}
    {curpage > 1 && (
        <Pagination.First onClick={() => handlePageClick(1)} />
    )}

    { curpage >7&&<Pagination.Ellipsis disabled={true}/>}


    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
            <Pagination.Item
            activeLabel=""
            size="sm"
                key={page}
                active={page === curpage} 
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Pagination.Item>
        );
      })}


    { curpage + 7 <= totalpage&&<Pagination.Ellipsis  disabled={true}/>}
     
          
      {curpage < totalpage && (
        <Pagination.Last onClick={() => handlePageClick(totalpage)} />
          )}
           {curpage + 5 <= totalpage && (
        <Pagination.Next onClick={() => handlePageClick(Math.min(curpage + 5, totalpage))}>
          +5
        </Pagination.Next>
      )}

    </Pagination>
  );
}

export default TablePagenation;
