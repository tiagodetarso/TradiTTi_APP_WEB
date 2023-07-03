import React from 'react'
import styles from './Select.module.css'

export default function Select ({ name, text, size, ops, handleOnChange }) {
    
    let options = []

    if (Array.isArray(ops)) {
        options = ops.map(op => (
            <option className={styles.options} key={op} value={op}>{op}</option>
        ))
    }

    return (
        <div className={styles.custom_select}>
            <label htmlFor={name}>{text}</label>
            <select id={name} name={name} size={size} onChange={handleOnChange}>
                {options}
            </select>
        </div>
    )
}