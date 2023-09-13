import React from 'react'
import useCards from '../../hooks/useCards'
import useMenu from '../../hooks/useMenu'
import Card from "../Components/Card"

const Menu = () => {
    const { menuOn } = useMenu()

    const { cards } = useCards()

    return (
        menuOn &&
        <div className="menu">{cards && cards.map((el) => {
            return <Card toggled={menuOn} id={el.id} cardNumber={el.cardNumber} name={el.name} date={el.expiryDate} key={el.id} />
        })}</div>
    )
}

export default Menu