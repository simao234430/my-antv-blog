import React, { useEffect } from 'react';
const Layout: React.FC<any> = ({ children, location }) => {
    return (
        <main>{children}</main>
    )
}
export default Layout