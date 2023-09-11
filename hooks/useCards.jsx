import React, { useContext } from 'react'

import { CardContext } from '../context/cardContext'

const useCards = () => useContext(CardContext)

export default useCards