import React from 'react';

function Consumer({children}) {
    return (
        <div className="container consumer-wrapper">
            {children}
        </div>
    );
}

export default Consumer;