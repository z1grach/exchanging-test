import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Exchanging.module.scss";
import ExchangingSelect from "./ExchangingSelect";
import ExchangingInputLayout from "./ExchangingInputLayout";
import {Context} from "../../index";

const ExchangingElem = observer(({type}: { type: string }) => {
    const {coreStore} = useContext(Context);

    return (
        <div className={styles.exchangeShell}>
            {coreStore.showList === type
                ? <ExchangingSelect type={type}/>
                : <ExchangingInputLayout type={type}/>
            }
        </div>
    );
});

export default ExchangingElem;