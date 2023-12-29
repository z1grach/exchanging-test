import React from 'react';
import {observer} from "mobx-react-lite";
import styles from "./CurrencyTicker.module.scss";

type ICurrencyTickerProps = {
    imgUrl: string | undefined;
    ticker: string | undefined;
}

const CurrencyTicker = observer(({imgUrl, ticker}: ICurrencyTickerProps) => {

    return (
        <div className={styles.currencyName}>
            <div className={styles.imgBlock}>
                <img
                    src={imgUrl ? imgUrl : ''}
                    alt={''}
                />
            </div>
            <span>{ticker ? ticker : ''}</span>
        </div>
    );
});

export default CurrencyTicker;