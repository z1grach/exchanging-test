import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Exchanging.module.scss";
import {ReactComponent as MiniArrow} from "../../assets/mini_arrow.svg";
import {Context} from "../../index";
import {API_KEY} from "../../utils";

const ChangeButton = observer(() => {
    const {coreStore} = useContext(Context);

    const handleClick = () => {
        coreStore.setLoading(true);

        coreStore.changeCurrentCurrency();

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
    }

    return (
        <div className={styles.buttonBlock}>
            <button
                className={styles.changeBtn}
                onClick={handleClick}
            >
                <MiniArrow style={{transform: 'rotate(180deg)'}}/>
                <MiniArrow/>
            </button>
        </div>
    );
});

export default ChangeButton;