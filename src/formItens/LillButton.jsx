import React from 'react'
import styles from './LillButton.module.css'

export default function Button ( {text, handleOnClick, customClass } ) {

    return (
        <div className={styles.div}>
            <button
                className={`${styles.btn} ${styles[customClass]}`}
                onClick={handleOnClick}
            >
                { text }
            </button>
        </div>
    )
}