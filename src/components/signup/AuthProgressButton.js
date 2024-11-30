import React, { useEffect, useState } from "react";

//있어야할 것들: 만료시간 카운트
//버튼의 상태. 1. 인증번호 전송 -> 2. 입력창 잠금처리,x버튼 넣기  만료시간 카운트 + 번호 재발송
//->
function AuthProgressButton(props) {
    const { setState } = props;
    const [progress, setProgress] = useState(1);

    useEffect(() => { })

    const clickHandler = () => { 

    }
	return <button onClick={clickHandler}></button>;
}

export default AuthProgressButton;
