import { Outlet, useNavigate } from "react-router-dom";
import ProducerPageNav from "../components/common/ProducerPageNav";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function ProducerPageLayout() {
    return (
		<>
			<div className="">
				<ProducerPageNav />
				<main className="">
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default ProducerPageLayout;

