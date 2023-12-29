import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ICurrency} from "../../types";
import styles from "./Exchanging.module.scss";
import {Context} from "../../index";
import {API_KEY} from "../../utils";

const ExchangingSelectElem = observer(({el, type}: { el: ICurrency, type: string }) => {
    const {coreStore} = useContext(Context);

    const handleClickElem = (el: ICurrency) => {
        coreStore.setLoading(true);

        if (type === 'from') {
            coreStore.setCurrencyFrom(el);
        } else {
            coreStore.setCurrencyTo(el);
        }


        fetch(`https://api.changenow.io/v1/min-amount/${coreStore.currencyFrom?.ticker}_${coreStore.currencyTo?.ticker}?api_key=${API_KEY}`)
            .then((res: Response) => res.json())
            .then(({minAmount}) => {
                if (minAmount !== undefined) coreStore.setMinExchange(minAmount);
                else throw new Error();
            })

            .then(() => fetch(`https://api.changenow.io/v1/exchange-amount/${coreStore.minExchange}/${coreStore.currencyFrom?.ticker}_${coreStore.currencyTo?.ticker}/?api_key=${API_KEY}`))
            .then((res: Response) => res.json())
            .then(({estimatedAmount}) => {
                if (estimatedAmount !== undefined) coreStore.setEstimatedExchange(estimatedAmount.toString());
                else throw new Error();
            })


            .then(() => {
                if (coreStore.pairDisable) coreStore.setPairDisable(false);
            })
            .catch(() => {
                coreStore.setPairDisable(true);
                coreStore.setMinExchange(0);
                coreStore.setEstimatedExchange('-');
            })
            .finally(() => coreStore.setLoading(false))

        coreStore.setShowList('');
    }

    return (
        <div
            key={el.ticker}
            className={styles.elemList}
            onClick={handleClickElem.bind(null, el)}
        >
            <div className={styles.elemImg}>
                <img
                    src={el.image}
                    alt={''}
                    loading={'lazy'}
                />
            </div>
            <div className={styles.elemTicker}>
                {el.ticker.toUpperCase()}
            </div>
            <div className={styles.elemName}>
                {el.name}
            </div>
        </div>
    );
});

export default ExchangingSelectElem;