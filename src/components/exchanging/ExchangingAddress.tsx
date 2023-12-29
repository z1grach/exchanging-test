import React from 'react';
import {observer} from "mobx-react-lite";
import styles from "./ExchangingAddress.module.scss";
import ErrorPair from "./ErrorPair";

const ExchangingAddress = observer(() => {
    return (
        <div className={styles.addressBlock}>
            <div className={styles.title}>Your Ethereum address</div>
            <div className={styles.inputBlock}>
                <div className={styles.input}/>
                <div className={styles.buttonBlock}>
                    <button>EXCHANGE</button>
                    <ErrorPair/>
                </div>
            </div>
        </div>
    );
});

export default ExchangingAddress;