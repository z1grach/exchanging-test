import React, {useContext, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./Exchanging.module.scss";
import ExchangingSelectTodos from "./ExchangingSelectTodos";
import {ICurrency} from "../../types";
import {Context} from "../../index";

interface IExchangingSelectListProps {
    searchValue: string;
    type: string;
}

const ExchangingSelectList = observer(({searchValue, type}: IExchangingSelectListProps) => {
    const {coreStore} = useContext(Context);
    const [limit, setLimit] = useState<number>(50);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (((e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight) < 50) && limit < coreStore.currency.length) {
            setLimit(limit + 50);
        }
    }

    const currencyList = useMemo(() => {
        if (searchValue) {
            return coreStore.currency.filter((el: ICurrency) => {
                if (el.ticker === coreStore.currencyTo?.ticker) return false;
                if (el.ticker === coreStore.currencyFrom?.ticker) return false;

                return el.name?.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            });
        }

        return coreStore.currency.slice(0, limit);

        // eslint-disable-next-line
    }, [searchValue, coreStore.currency, limit]);

    return (
        <div
            className={styles.currencyList}
            onScroll={scrollHandler}
        >
            {currencyList?.length
                ? <ExchangingSelectTodos todos={currencyList} type={type}/>
                : <div className={styles.elemList}>Not found</div>
            }
        </div>
    );
});

export default ExchangingSelectList;