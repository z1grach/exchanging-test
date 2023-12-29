import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ICurrency} from "../../types";
import CurrentExchange from "./CurrentExchange";
import {API_KEY} from "../../utils";

const ExchangingMain = observer(() => {
    const {coreStore} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        fetch('https://api.changenow.io/v1/currencies?active=true&fixedRate=true')
            .then((res: Response) => res.json())
            .then((data: ICurrency[]) => {
                if (data?.length >= 2) coreStore.setCurrency(data);
                else throw new Error('List error');
            })
            .catch(() => {
                throw new Error('List error')
            })

            .then(() => fetch(`https://api.changenow.io/v1/min-amount/${coreStore.currencyTo?.ticker}_${coreStore.currencyTo?.ticker}?api_key=${API_KEY}`))
            .then((res: Response) => res.json())
            .then(({minAmount}) => {
                if (minAmount !== undefined) coreStore.setMinExchange(minAmount);
                else throw new Error('Min error');
            })

            .then(() => fetch(`https://api.changenow.io/v1/exchange-amount/${coreStore.minExchange}/${coreStore.currencyFrom?.ticker}_${coreStore.currencyTo?.ticker}/?api_key=${API_KEY}`))
            .then((res: Response) => res.json())
            .then(({estimatedAmount}) => {
                if (estimatedAmount !== undefined) coreStore.setEstimatedExchange(estimatedAmount.toString());
                else throw new Error('Exchange error');
            })

            .catch((e) => {
                if (e.message === 'List error') setShowError(true);
                else coreStore.setPairDisable(true);
            })
            .finally(() => setLoading(false));

        // eslint-disable-next-line
    }, []);

    if (loading) return <div style={{marginTop: '30px', fontSize: '1.5em'}}>Loading...</div>;

    if (showError) return <div style={{marginTop: '30px', fontSize: '1.5em'}}>ERROR</div>;

    console.log('ExchangingMain')
    return <CurrentExchange/>;
});

export default ExchangingMain;