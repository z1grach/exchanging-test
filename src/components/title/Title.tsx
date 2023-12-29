import React from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Title.module.scss";

const Title = observer(() => {
    return (
        <div className={styles.titles}>
            <h1>Crypto Exchange</h1>
            <h2>Exchange fast and easy</h2>
        </div>
    );
});

export default Title;