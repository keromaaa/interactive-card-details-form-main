import React, { useState, useEffect, useRef } from 'react'
import useCards from '../../hooks/useCards'

import axios from 'axios'

export default function Form({ cardNumber, handleCardNumberChange, handleSubmit }) {
    const [nameError, setNameError] = useState('')
    const [cardNumberError, setCardNumberError] = useState('')
    const [dateError, setDateError] = useState('')
    const [ccvError, setCcvError] = useState('')
    const { card, setCards } = useCards();

    const nameRef = useRef(null)
    const numberRef = useRef(null)
    const monthRef = useRef(null)
    const yearRef = useRef(null)
    const ccvRef = useRef(null)

    const validateInputs = () => {
        let isValid = true

        if (!nameRef.current.value) {
            setNameError("Can't be blank")
            isValid = false
        } else {
            setNameError('')
        }

        if (!numberRef.current.value) {
            setCardNumberError("Can't be blank")
            isValid = false
        } else if (!numberRef.current.value.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
            setCardNumberError('Invalid card number format')
            isValid = false
        } else {
            setCardNumberError('')
        }

        const month = monthRef.current.value
        const year = yearRef.current.value
        const currentDate = new Date()
        const inputDate = new Date(`20${year}`, month - 1)

        if (!month || !year) {
            setDateError("Can't be blank")
            isValid = false
        } else if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || inputDate < currentDate) {
            setDateError('Invalid date')
            isValid = false
        } else {
            setDateError('')
        }

        if (!ccvRef.current.value) {
            setCcvError("Can't be blank")
            isValid = false
        } else if (!ccvRef.current.value.match(/^\d{3}$/)) {
            setCcvError('Invalid CCV')
            isValid = false
        } else {
            setCcvError('')
        }

        return isValid;
    }

    const handleConfirmClick = () => {
        if (validateInputs()) {
            const name = nameRef.current.value
            const number = numberRef.current.value
            const date = monthRef.current.value + "/" + yearRef.current.value
            const ccv = ccvRef.current.value
            handleSubmit(name, number, date, ccv); // Save input data in the parent component state

            const card = {
                name: name,
                cardNumber: number,
                expiryDate: date,
                ccv: ccv
            }

            axios.post('https://localhost:7146/api/CardDetails/Create', card, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (!card) {
            nameRef.current.value = "";
            numberRef.current.value = "";
            monthRef.current.value = "";
            yearRef.current.value = "";
        } else {
            const [monthValue, yearValue] = card ? card.date.split('/') : ['', '']
            nameRef.current.value = card.name;
            numberRef.current.value = card.cardNumber;
            monthRef.current.value = monthValue;
            yearRef.current.value = yearValue;
        }
    }, [card])


    return (
        <div className="form">
            <div>
                <label htmlFor="name">CARDHOLDER NAME</label>
                <input ref={nameRef} type="text" name="Cardholder name" id="name" placeholder='e.g. Jane Appleseed' />
                <p className={`errorTxt ${nameError ? 'active' : ''}`}>{nameError}</p>
            </div>
            <div>
                <label htmlFor="number">CARD NUMBER</label>
                <input ref={numberRef} type="text" name="Card number" id="number" maxLength={19} onChange={handleCardNumberChange} placeholder='e.g. 1234 5678 9000 0000' />
                <p className={`errorTxt ${cardNumberError ? 'active' : ''}`}>{cardNumberError}</p>
            </div>
            <div className="flex gap-15">
                <div className="block">
                    <label htmlFor="date">EXP. DATE (MM/DD)</label>
                    <div className="flex gap-10">
                        <input ref={monthRef} type="number" name="month" id="date" placeholder='MM' maxLength={2} />
                        <input ref={yearRef} type="number" name="year" id="date" placeholder='YY' maxLength={2} />
                    </div>
                    <p className={`errorTxt ${dateError ? 'active' : ''}`}>{dateError}</p>
                </div>
                <div className="block">
                    <label htmlFor="ccv">CCV</label>
                    <input ref={ccvRef} type="number" name="ccv" id="ccv" placeholder='e.g. 123' />
                    <p className={`errorTxt ${ccvError ? 'active' : ''}`}>{ccvError}</p>
                </div>
            </div>
            <input type="button" value="Confirm" onClick={handleConfirmClick} />
        </div>
    )
}
