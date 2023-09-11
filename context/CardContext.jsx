import axios from 'axios'
import React from 'react'

import { useState, useEffect } from 'react'

export const CardContext = React.createContext(null)

const CardProvider = ({ children }) => {
    const [cards, setCards] = useState([])
    const [card, setCard] = useState(null)

    const getCards = () => {
        axios
            .get('https://localhost:7146/api/CardDetails/GetAll')
            .then(response => response.data)
            .then(data => setCards(data.data))
            .catch(err => console.log(err))

    }

    const getCard = (cardNumber, name, date) => {
        setCard({
            name: name,
            cardNumber: cardNumber,
            date: date
        })
    }

    useEffect(() => {
        if (cards.length === 0)
            getCards()
    }, [cards])

    return (
        <CardContext.Provider value={{
            cards,
            setCard,
            getCards,
            card
        }}>
            {children}
        </CardContext.Provider>
    )
}

export default CardProvider