import React, {useContext, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import styles from "./Exchanging.module.scss";
import {ReactComponent as Close} from "../../assets/close_icon.svg";
import ExchangingSelectList from "./ExchangingSelectList";

const ExchangingSelect = observer(({type}: { type: string }) => {
    const {coreStore} = useContext(Context);
    const [searchValue, setSearchValue] = useState<string>('');
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        const list = e.currentTarget.parentNode?.parentNode?.lastChild as Element;

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            setSearchValue(value);
            if (list) list.scrollTo(0, 0);
        }, 400);
    }

    return (
        <div className={styles.selectBlock}>
            <div className={styles.searchBlock}>
                <input
                    type={'text'}
                    placeholder={'Search'}
                    className={styles.inputBlock}
                    defaultValue={''}
                    onChange={handleChangeInput}
                />
                <div className={styles.closeBtn}>
                    <button
                        onClick={() => coreStore.setShowList('')}
                    >
                        <Close/>
                    </button>
                </div>
            </div>
            <ExchangingSelectList searchValue={searchValue} type={type}/>
        </div>
    )
});

export default ExchangingSelect;