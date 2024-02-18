import React from 'react'
import { FiXOctagon, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import styles from './toast.module.css'
import { poppinsRegular } from '../fonts';

interface ICustomToast {
    title: string
    type: "success" | "warning" | "error"
    content?: string
}

const CustomToast = ({title, type = 'success', content }: ICustomToast) => {
    const renderIcon = () => {
        if (type === 'warning') {
            return <FiAlertTriangle className={styles.icon}/>;
        } else if (type === 'error') {
            return <FiXOctagon className={styles.icon} />;
        } else {
            return <FiCheckCircle className={styles.icon} />;

        }
    };
    return (
        <div className={styles.toastContainer}>
            {renderIcon()}
            <div className={styles.toastText}>
                <h5 className={styles.title} style={poppinsRegular.style}>{title}</h5>
                {
                    !!content &&
                    <p className={styles.content} style={poppinsRegular.style}>
                        {content}
                    </p>
                }
            </div>
        </div>
    );
}

export default CustomToast
