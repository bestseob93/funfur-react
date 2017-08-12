import React from 'react';

function FormLabel({name, contact}) {
    const contactFormStyle = {
        padding: 0,
        marginTop: 5
    };

    const normalFormStyle = {
        marginTop: 5
    };

    return (
        <div
            className={`col-md-2 col-xs-10 ${contact ? '' : 'text-right col-xs-offset-1 col-md-offset-1'}`}
            style={contact ? contactFormStyle : normalFormStyle}
        >
            <label className={`${contact ? '' : '_input_label'}`}>
                {name}
            </label>
        </div>
    );
};

export default FormLabel;