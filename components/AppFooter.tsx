import { version } from '../package.json';
import styles from '../styles/AppFooter.module.css';
import React from 'react';

const AppFooter = () => {
    return (
        <footer className={styles.footer}>
            Ri.fiuto ver. <b>{version}</b> in <b>{process.env.NODE_ENV}</b> mode <br />
            Copyright © {new Date().getFullYear()} <b>Apulia Lab S.r.l.</b> | P.Iva IT06804150727
        </footer>
    );
}

export default AppFooter;