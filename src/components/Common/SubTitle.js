import React from 'react';

function SubTitle({title}) {
    return (
        <div className="row sub-title">
            <div className="col-md-offset-1 col-md-2 col-xs-offset-1 col-xs-4">
                <h3 className="text-center">{title}</h3>
            </div>
        </div>
    );
};

export default SubTitle;