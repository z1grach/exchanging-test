import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Exchanging.module.scss";
import CurrencyTicker from "./CurrencyTicker";
import {ReactComponent as Arrow} from "../../assets/arrow.svg";
import {Context} from "../../index";
import ExchangingInput from "./ExchangingInput";

const ExchangingInputLayout = observer(({type}: { type: string }) => {
    const {coreStore} = useContext(Context);

    return (
        <div className={styles.exchangeBlock}>
            <ExchangingInput type={type}/>
            <div className={styles.line}/>
            <div
                className={styles.currency}
                onClick={() => coreStore.setShowList(type)}
            >
                <CurrencyTicker
                    ticker={type === 'from' ? coreStore.currencyFrom?.ticker.toUpperCase() : coreStore.currencyTo?.ticker.toUpperCase()}
                    imgUrl={type === 'from' ? coreStore.currencyFrom?.image : coreStore.currencyTo?.image}
                />
                <Arrow/>
            </div>
        </div>
    );
});

export default ExchangingInputLayout;