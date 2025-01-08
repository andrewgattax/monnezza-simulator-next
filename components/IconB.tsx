import '../styles/IconB.css';
import React from 'react';

type Props = {
    iconName: string;
    hasPadding?: boolean;
};

const IconB = ({iconName, hasPadding = true}: Props) => {
    return (
        <i className={`bi bi-${iconName} ${hasPadding ? "spo" : ""}`}></i>
    );
}

export default IconB;