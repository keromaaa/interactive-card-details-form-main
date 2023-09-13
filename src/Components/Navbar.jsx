import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import Burger from './Burger'
import BurgerProvider from '../../context/MenuContext'

const Navbar = () => {

    return (
        <>
            <Burger />
            <Menu />
        </>
    )
}

export default Navbar