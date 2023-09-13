import React from 'react'

import { useState, useEffect } from 'react'

export const MenuContext = React.createContext(null)

const MenuProvider = ({ children }) => {
    const [menuOn, setMenuOn] = useState(false)
    const [burgerColor, setBurgerColor] = useState('')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const updateWindowWidth = () => setWindowWidth(window.innerWidth)

        window.addEventListener('resize', updateWindowWidth)

        setBurgerColor(!menuOn && windowWidth < 600 ? 'white' : 'hsl(278, 68%, 11%)')

        return () => {
            window.removeEventListener('resize', updateWindowWidth)
        }
    }, [windowWidth, menuOn])

    const handleBurgerClick = () => {
        setMenuOn((prevMenuOn) => !prevMenuOn);
    }

    return (
        <MenuContext.Provider value={{
            menuOn,
            burgerColor,
            handleBurgerClick
        }}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuProvider