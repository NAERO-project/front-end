import { useEffect, useState } from "react";

import FilterCSS from "./css/AdminFilterSearch.module.css";

function FilterSearchInput(props) {
    const { keywords, state, setState, handler } = props;
    const [ input, setInput ] = useState("")
    const keys = Object.keys(keywords);
    const [ curKeyword, setKeyword ] = useState(keys[0])
    
    useEffect(() => { 
        setState({
            ...state,
            keyword:{ [curKeyword] :input}
        }) 
        console.log(state)
    }, [curKeyword, input])
    

    return (
        <div className={FilterCSS.box}>
            <input placeholder="검색어" onChange={(e) => {setInput(e.target.value) }} type="text" /> 
            <select onChange={(e) => { setKeyword(e.target.value) }} >{keys.map((value, index, array) => {
                return (<option value={value}>{keywords[value] }</option>)
            }) }</select><button onClick={handler}>검색</button>
        </div>
    );
}

export default FilterSearchInput;