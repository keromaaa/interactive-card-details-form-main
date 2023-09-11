import React from 'react'
import Hamburger from 'hamburger-react';

const Burger = ({ onClick, color }) => {
    return (
        <div className="hamburger flex" style={{ zIndex: 10 }}>
            <p className="hamburger-label">My cards</p>
            <Hamburger
                onToggle={onClick}
                hideOutline={true}
                color={color}
                size={25}
                direction="right"
                rounded
            />
        </div>
    );
}

export default Burger