import React from 'react'
import styles from './ButtonX.module.css'

export default function ButtonX ( {text, handleOnClick } ) {

    return (
        <div>
            <button
                className={styles.btn}
                onClick={handleOnClick}
            >
                { text }
            </button>
        </div>
    )
}