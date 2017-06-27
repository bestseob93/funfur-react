import React from 'react';

const SubTitle = ({title}) => {
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12">
                <h3 className="text-center">{title}</h3>
            </div>
        </div>
    );
};

export default SubTitle;