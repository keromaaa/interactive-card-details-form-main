import { React, useState } from "react"
import './App.css'
import Cards from './Components/Cards.jsx'
import Form from './Components/Form.jsx'
import Confirmation from './Components/Confirmation.jsx'

export default function App() {
    const [cardNumber, setCardNumber] = useState('')
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [ccv, setCcv] = useState("")
    const [infoUpdated, setInfoUpdated] = useState(false)

    const cardInfo = {
        cardNumber: cardNumber,
        name: name,
        date: date,
        ccv: ccv
    }

    const handleCardNumberChange = (event) => {
        const { value } = event.target
        const numericValue = value.replace(/\s/g, '') // Remove existing spaces
        const formattedValue = numericValue
            .replace(/(\d{4})/g, '$1 ') // Add spaces every 4 digits
            .trim();

        setCardNumber(formattedValue)
    };

    const updateCardInfo = (name, cardNumber, date, ccv) => {
        setCardNumber(cardNumber)
        setName(name)
        setDate(date)
        setCcv(ccv)
        setInfoUpdated(true)
    }

    return (
        <div className="app">
            <div className="background"></div>
            <div className="main">
                <Cards
                    cardInfo={cardInfo}
                    infoUpdated={infoUpdated}
                />
                {
                    infoUpdated ? 
                    <Confirmation /> :
                    <Form
                        cardNumber={cardNumber}
                        name={name}
                        date={date}
                        ccv={ccv}
                        handleCardNumberChange={handleCardNumberChange}
                        handleSubmit={updateCardInfo} />
                }
            </div>
        </div>
    )
}