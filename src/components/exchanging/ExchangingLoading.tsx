import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import styles from "./Exchanging.module.scss";

const ExchangingLoading = observer(() => {
    const {coreStore} = useContext(Context);

    if (coreStore.loading) {
        return (
            <div className={styles.loadingBlock}>
                <div className={styles.ldsDualRing}></div>
            </div>
        );
    }

    return <></>;
});

export default ExchangingLoading;