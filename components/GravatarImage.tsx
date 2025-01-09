"use client"
import styles from '../styles/GravatarPicture.module.css';
import Image from 'next/image';
import React from 'react';
import MD5 from "crypto-js/md5";

type Props = {
    email: string;
};

const GravatarImage = ({email}: Props) => {
    const hash = MD5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}?s=32&d=retro`;

    return (
        <Image src={url} alt="profile picture" width={30} height={30} className={`rounded-circle ${styles.mtb5}`} />
    );
}

export default GravatarImage;
