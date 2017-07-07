import React from 'react';

const Login = ({children}) => {
    return (
        <div className="auth-top-border middle-box text-center">
            { children }
        </div>
    );
}

export default Login;