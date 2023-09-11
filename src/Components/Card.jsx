import React from 'react'

import useCards from '../../hooks/useCards'
import axios from 'axios'

const Card = ({ id, onClick, cardNumber, name, date }) => {
    const { setCard, getCard, getCards } = useCards()

    const deleteCard = () => {
        axios
            .delete(`https://localhost:7146/api/CardDetails/Delete?id=${id}`)
            .then(response => response.data)
            .then(data => data.data)
            .catch(err => console.log(err))
            .finally(() => { getCards(); onClick(); })
    }

    return (
        <div className="wrapper">
            <div className="card" onClick={() => {
                onClick()
                getCard(cardNumber, name, date)
            }}>
                <p className="cardNumber">{cardNumber}</p>
                <div className="flex">
                    <p className="name">{name}</p>
                    <p className="date">{date}</p>
                </div>
            </div>
            <div className="close" onClick={deleteCard}></div>
        </div>
    )
}

export default Card