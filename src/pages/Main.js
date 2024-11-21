import React from "react";
import { Link } from "react-router-dom";

function Main() {
    return (
        <div>
            <h1>메인 페이지</h1>
            <Link to="/questions">
                <button>1:1 문의</button>
            </Link>
        </div>
    );
}

export default Main;
