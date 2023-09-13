import React from 'react'
import Hamburger from 'hamburger-react'
import useMenu from '../../hooks/useMenu'

const Burger = () => {
    const { menuOn, burgerColor, handleBurgerClick } = useMenu()

    return (
        <div className="hamburger flex" style={{ zIndex: 10 }}>
            <p className="hamburger-label">My cards</p>
            <Hamburger
                onToggle={handleBurgerClick}
                hideOutline={true}
                color={burgerColor}
                size={25}
                direction="right"
                toggled={menuOn}
                rounded
            />
        </div>
    )
}

export default Burger