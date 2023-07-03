import React from 'react'
import styles from './Input.module.css'

export default function Input ({
                                type,
                                text,
                                name,
                                placeholder,
                                handleOnChange,
                                value,
                                step,
                                accept,
                                pattern,
                                multiline }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
                checked={value}
                step={step}
                accept={accept}
                required pattern={pattern}
            />
        </div>
    )
}
