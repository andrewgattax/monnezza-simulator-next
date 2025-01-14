import styles from '../styles/IconB.module.css';
import React from 'react';

type Props = {
    iconName: string;
    hasPadding?: boolean;
    flipMargin?: boolean;
};

const IconB = ({iconName, hasPadding = true, flipMargin}: Props) => {
    return (
        <i className={`bi bi-${iconName} ${hasPadding ? (flipMargin? styles.spop : styles.spo) : ""}`}></i>
    );
}

export default IconB;