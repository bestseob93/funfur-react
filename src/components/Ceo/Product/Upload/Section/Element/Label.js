import React from 'react';

function Label({name}) {

    return (
        <div
            className={'col-md-2 col-xs-10 text-right col-xs-offset-1 col-md-offset-1'}
            style={{marginRight: 5}}
        >
            <label className='_input_label'>
                {name}
            </label>
        </div>
    );
};

export default Label;