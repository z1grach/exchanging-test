import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import Title from "./components/title/Title";
import ExchangingMain from "./components/exchanging/ExchangingMain";
import styles from "./App.module.scss";

const App: FC = observer(() => {

    return (
        <div className={styles.mainContent}>
            <Title/>
            <ExchangingMain/>
        </div>
    );
});

export default App;
