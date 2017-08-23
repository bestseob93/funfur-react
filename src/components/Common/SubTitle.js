import React from 'react';

function SubTitle({title}) {
    return (
        <div className="row sub-title ns-B">
            <div className="col-md-offset-1 col-md-2 col-xs-offset-1 col-xs-4">
                <p className="text-center" style={{marginBottom: '4px'}}>{title}</p>
            </div>
        </div>
    );
};

export default SubTitle;