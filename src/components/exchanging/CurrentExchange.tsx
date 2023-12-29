import React from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Exchanging.module.scss";
import ExchangingElem from "./ExchangingElem";
import ExchangingAddress from "./ExchangingAddress";
import ChangeButton from "./ChangeButton";
import ExchangingLoading from "./ExchangingLoading";

const CurrentExchange = observer(() => {

    console.log('CurrentExchange')
    return (
        <div className={styles.exchangeMain}>
            <ExchangingLoading/>
            <div className={styles.inputsBlock}>
                <ExchangingElem type={'from'}/>
                <ChangeButton/>
                <ExchangingElem type={'to'}/>
            </div>
            <ExchangingAddress/>
        </div>
    );
});

export default CurrentExchange;