import React from 'react'

import Container from './Container'

import logo from '../images/logo.png'

export default function Head() {


    return(
        <Container customClass='head'>
            <img src={logo} alt="traditti" />
        </Container>
    )

}