import React, { useState, useEffect } from 'react'
import Card from './Card'
import Burger from './Burger'
import useCards from '../../hooks/useCards'

const Navbar = ({ onClick, toggled }) => {
    const [burgerColor, setBurgerColor] = useState('')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const { cards } = useCards()

    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateWindowWidth)

        setBurgerColor(windowWidth < 600 ? 'white' : 'hsl(278, 68%, 11%)')

        return () => {
            window.removeEventListener('resize', updateWindowWidth)
        }
    }, [windowWidth])

    return (
        <>
            <Burger
                key={burgerColor}
                onClick={onClick}
                toggled={toggled}
                color={burgerColor}
            />
            {
                toggled &&
                <div className="menu">{cards && cards.map((el) => {
                    return <Card toggled={toggled} onClick={onClick} id={el.id} cardNumber={el.cardNumber} name={el.name} date={el.expiryDate} key={el.id} />
                })}</div>
            }
        </>
    )
}

export default Navbar