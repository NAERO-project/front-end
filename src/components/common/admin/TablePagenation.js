import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductMoreCSS from "../../../pages/products/css/ProductMore.module.css";

function TablePagenation(props) {
	const { curpage: currentPage, totalpage, setState: setCurrentPage } = props;

	console.log(currentPage);
	const pageNumber = [];
	if (totalpage > 0) {
		for (let i = 1; i <= totalpage; i++) {
			pageNumber.push(i);
		}
	}

	return (
		<div className={ProductMoreCSS.product_paging} style={{ padding: "50px 0 0 0" }}>
			{
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
					className=''
				>
					&lt;
				</button>
			}
			{pageNumber.map(num => (
				<li
					key={num}
					style={currentPage === num ? { backgroundColor: "#41535C" } : null}
					onClick={() => setCurrentPage(num)}
				>
					<button
						style={currentPage === num ? { color: "#fff", fontWeight: "500" } : null}
						className=''
					>
						{num}
					</button>
				</li>
			))}
			{
				<button
					className=''
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage >= totalpage || totalpage == 1}
				>
					&gt;
				</button>
			}
		</div>
	);
}

export default TablePagenation;
