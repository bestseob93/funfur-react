import React from 'react';

function SubTitle({title}) {
    return (
        <div className="row sub-title">
            <div className="col-md-12 col-xs-12">
                <h3 className="text-center">{title}</h3>
            </div>
        </div>
    );
};

export default SubTitle;