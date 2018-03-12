import React from 'react';

function InputField({ type='text', name='none-input', placeholder='none-placeholder', isRequired=false, form=[], callback=f=>f }) {

    const handler = (e) => {
        callback(form, e.target);
    };

    return (
        <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={isRequired}
                onBlur={handler}
                className='form-control'
            />
        </div>
    );
}

export default InputField;