import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './Mensagem.module.css'

export default function Mensagem({type}) {

    const mensagem = useSelector((state) => state.loginresponse.mensagem)

    const [visible, setVisible] = useState(false)

    useEffect (() => {

        if (!mensagem | mensagem === '0') {
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)
        
        return () => clearTimeout(timer)
           
    }, [mensagem])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{mensagem.msg}</div>
            )}
        </>
    )
}