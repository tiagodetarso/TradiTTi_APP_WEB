import React from 'react'
import { FaWhatsapp} from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'

import styles from './Footer.module.css'

export default function Footer () {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <AiOutlineMail/>
                </li>
                <li>
                    <FaWhatsapp/>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>TradiTTi Delivery App</span> &copy;
            </p>
        </footer>
    )
}