import React, { useEffect } from 'react';
const Layout: React.FC<any> = ({ children, location }) => {
    return (
        <main>
            <div>test</div>
            {children}
        </main>
    )
}
export default Layout