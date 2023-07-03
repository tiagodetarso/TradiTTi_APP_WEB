import React from 'react'
import styles from './Button.module.css'

export default function Button ( {text, handleOnClick } ) {

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