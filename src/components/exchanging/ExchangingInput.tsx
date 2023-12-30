import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Exchanging.module.scss";
import {Context} from "../../index";
import {API_KEY} from "../../utils";

const ExchangingInput = observer(({type}: { type: string }) => {
    const {coreStore} = useContext(Context);
    const [inputValue, setInputValue] = useState(coreStore.minExchange.toString());
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.currentTarget.value;

        setInputValue(value);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(async () => {
            try {
                value = Number(value);
                if (isNaN(value)) value = 0;

                if (value < coreStore.minExchange) {
                    coreStore.setEstimatedExchange('-');
                    coreStore.setPairDisable(true);
                } else {
                    const res = await fetch(`https://api.changenow.io/v1/exchange-amount/${value}/${coreStore.currencyFrom?.ticker}_${coreStore.currencyTo?.ticker}/?api_key=${API_KEY}`);
                    const {estimatedAmount} = await res.json();

                    if (estimatedAmount !== undefined) {
                        coreStore.setEstimatedExchange(estimatedAmount.toString());
                        if (coreStore.pairDisable) coreStore.setPairDisable(false);
                    } else throw new Error();
                }
            } catch (e) {
                coreStore.setEstimatedExchange('-');
                coreStore.setPairDisable(true);
            }

        }, 400);
    }

    useEffect(() => {
        const value = coreStore.minExchange.toString();

        if (value === inputValue) return;

        setInputValue(value);
        // eslint-disable-next-line
    }, [coreStore.minExchange]);

    return (
        <input
            onChange={handleChangeInput}
            type={'text'}
            className={styles.input}
            value={type === 'from' ? inputValue : coreStore.estimatedExchange}
            style={type === 'from' ? {} : {pointerEvents: 'none'}}
        />
    );
});

export default ExchangingInput;