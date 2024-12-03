import { useState } from "react";
import  TableCSS from "./css/UserTableStyle.module.css"
import FilterToggleCSS from "./css/AdminFilterToggle.module.css";

function FilterModal(props) {
    const {state, setState, filters } = props
    const [toggle, setToggle] = useState(false);


    const filterKeyword = Object.keys(filters)

    const checkHandler = (e) => { 
        setState({
            ...state ,
            filter: { ...state.filter, [e.target.name]:e.target.value }
        })
    }
    const cancleHandler = (e) => { 
        const radios = document.querySelectorAll("input")

        filterKeyword.forEach(element => {
            delete state.filter[element]; 
        });
            radios.forEach(i => {
                console.log(i)
                i.checked = false;
            })
    }
    const toggleButton = () => { 
        return (toggle? ("필터 닫기 ▲"):("필터 열기 ▼"))
    }

    return (
        <div>
            <button className={TableCSS.filter_btn} onClick={() => { setToggle(!toggle) }}> {toggleButton() }</button>
            {toggle &&  <div className={TableCSS.filter_box}>
                {
                filterKeyword.map((colum, index, array) => {
                // console.log(colum)
                // console.log(filters[colum].value)
                const keys = Object.keys(filters[colum].value)
                const values = filters[colum].value
                // console.log("keys", keys)
                return (
                    <div className={TableCSS.filter_list} key={colum}>
                        <div>
                        <div className={TableCSS.name}>
                            <p className={TableCSS.filter_item_box}>{filters[colum].name}</p>
                        </div>
                      
                        <div className={TableCSS.filter_item_box}>{
                            keys.map((value, index) => {
                                return (<p style={{fontSize: '16px'}} className={TableCSS.filter_item}><input type="radio" name={colum} value={value} onChange={checkHandler} /><label>{values[value]}</label></p>)
                            })}
                        
                        <button className={TableCSS.btn2} onClick={() => {
                            const radios = document.getElementsByName(colum);
                            console.log(radios);
                            if (state.filter[colum]) {
                                console.log(state.filter[colum]);
                                const newFilter = { ...state.filter };
                                delete newFilter[colum]; // 필드 삭제
                        
                                setState(prevState => ({
                                    ...prevState,
                                    filter: newFilter, // 수정된 filter만 업데이트
                                }));
                                radios.forEach(i => {
                                    console.log(i);
                                    i.checked = false;
                                });
                            }
                        }}>필터 해제</button>
                        
                        </div>
                        </div>
                        

                        
                        
                        
                    </div>)
            })
                }
                
                <button
                    className={[TableCSS.filter_remove_position, TableCSS.filter_button].join(' ')}
                    onClick={cancleHandler}>필터 전체 해제</button>
            </div>   
            }
        </div>
    );
}

export default FilterModal;