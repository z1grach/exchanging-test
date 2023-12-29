import React, {useContext, useMemo, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import styles from "./Exchanging.module.scss";
import {ReactComponent as Close} from "../../assets/close_icon.svg";
import {ICurrency} from "../../types";
import ExchangingSelectTodos from "./ExchangingSelectTodos";

const ExchangingSelect = observer(({type}: { type: string }) => {
    const {coreStore} = useContext(Context);
    const [searchValue, setSearchValue] = useState<string>('');
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => setSearchValue(value), 400);
    }

    const currencyList = useMemo(() => {
        if (searchValue) {
            return coreStore.currency.filter((el: ICurrency) => {
                if (el.ticker === coreStore.currencyTo?.ticker) return false;
                if (el.ticker === coreStore.currencyFrom?.ticker) return false;

                return el.name?.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            });
        }

        return coreStore.currency.slice(0, 50);

        // eslint-disable-next-line
    }, [searchValue, coreStore.currency]);

    console.log('ExchangingSelect', type)
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
            <div className={styles.currencyList}>
                {currencyList?.length
                    ? <ExchangingSelectTodos todos={currencyList} type={type}/>
                    : <div className={styles.elemList}>Not found</div>
                }
            </div>
        </div>
    )
});

export default ExchangingSelect;