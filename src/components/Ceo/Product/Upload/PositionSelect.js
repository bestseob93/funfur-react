import React from 'react';

function PositionSelect({first, changeHandler, formValue}) {
    const positionArr_1 = ['거실', '주방', '침실', '키즈/유아', '학생/서재', '인테리어 소품', '화장실'];
    const positionIndex = positionArr_1.indexOf(formValue);
    console.log(formValue);
    console.log(positionIndex);
    let positionArr_2 = [];

    
    if(first) {
        return (
            <select
                className="form-control"
                name="productPosition"
                onChange={changeHandler}
            >
                <option>공간별 분류</option>
                {positionArr_1.map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        )
    } else {
        if(positionIndex !== -1) {
            positionArr_1.splice(positionIndex, 1);
            positionArr_2 = positionArr_1;
        }
        return (
            <select
                className="form-control"
                name="productPosition_2"
                onChange={changeHandler}
            >
                <option>공간별 분류</option>
                {positionArr_2.map((value, index) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        )
    }
}

export default PositionSelect;