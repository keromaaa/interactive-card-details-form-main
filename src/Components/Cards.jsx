import "../App.css"
import { useRef, useEffect } from 'react'
import Logo from "./Logo"

export default function Cards({ cardInfo, infoUpdated }) {
    const cardFrontRef = useRef(null)
    const cardBackRef = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            if (cardFrontRef.current && wrapperRef.current) {
                const cardWidth = cardFrontRef.current.offsetWidth
                const wrapperWidth = wrapperRef.current.offsetWidth

                const cardFront = cardFrontRef.current
                const cardBack = cardBackRef.current
                const wrapper = wrapperRef.current

                if (wrapperWidth === cardWidth) {
                    cardFront.classList.add('card-shrinking')
                    cardBack.classList.add('card-shrinking')
                    wrapper.classList.add('wrapper-shrinking')
                } else {
                    cardFront.classList.remove('card-shrinking')
                    cardBack.classList.remove('card-shrinking')
                    wrapper.classList.remove('wrapper-shrinking')
                }
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div ref={wrapperRef} className="card-wrapper">
            <div ref={cardFrontRef} className="card front">
                {/* <Logo width={"29%"} height={"29%"} /> */}
                <p className="cardNumber">{infoUpdated ? cardInfo.cardNumber : "0000 0000 0000 0000"}</p>
                <div>
                    <p className="name">{infoUpdated ? cardInfo.name.toUpperCase() : "FIRST LAST"}</p>
                    <p className="date">{infoUpdated ? cardInfo.date : "MM/YY"}</p>
                </div>
            </div>
            <div ref={cardBackRef} className="card back">
                <p className="ccv">{infoUpdated ? cardInfo.ccv : "000"}</p>
            </div>
        </div>
    )
}