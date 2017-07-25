import React from 'react';

function Consumer({children}) {
    return (
        <div className="container">
            {children}
        </div>
    );
}

export default Consumer;