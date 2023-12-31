import React, { Children } from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>{children}</div>
    );
};

export default Auth;
