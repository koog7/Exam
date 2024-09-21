import React from 'react';
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div style={{display:'flex', flexDirection:'column', width:'200px',backgroundColor:'#525252', gap:'20px', padding:'15px', minHeight:'635px'}}>
                <NavLink to={'/'} className={'category-s'}>All vehicles</NavLink>
                <NavLink to={'/'} className={'category-s'}>Cars</NavLink>
                <NavLink to={'/'} className={'category-s'}>Boats</NavLink>
                <NavLink to={'/'} className={'category-s'}>Helicopters</NavLink>
            </div>
        </div>
    );
};

export default Sidebar;