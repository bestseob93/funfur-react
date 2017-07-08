import React from 'react';

function FormLabel({name}) {
    return (
        <div className="col-md-2 text-right col-xs-10 col-xs-offset-1 col-md-offset-1">
            <label className="_input_label">
                {name}
            </label>
        </div>
    );
};

export default FormLabel;