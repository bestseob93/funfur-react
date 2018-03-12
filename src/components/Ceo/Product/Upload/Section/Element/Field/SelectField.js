import React from 'react';

function SelectField({ name='none-select', placeholder='none-placeholder', isRequired=false, options=[], form=[], callback=f=>f }) {

    const handler = (e) => {
        callback(form, e.target);
    };

    return (
        <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <select
                name={name}
                placeholder={placeholder}
                required={isRequired}
                className="form-control"
                onChange={handler}
            >
                <option disabled selected>옵션 선택</option>
                {options.map(option => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;