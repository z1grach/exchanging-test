import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ICurrency} from "../../types";
import ExchangingSelectElem from "./ExchangingSelectElem";
import {Context} from "../../index";

const ExchangingSelectTodos = observer(({todos, type}: { todos: ICurrency[], type: string }) => {
    const {coreStore} = useContext(Context);

    return (
        <>
            {todos.map((el: ICurrency) => {
                if (el.ticker === coreStore.currencyTo?.ticker) return null;
                if (el.ticker === coreStore.currencyFrom?.ticker) return null;

                return <ExchangingSelectElem key={'list_' + el.ticker} el={el} type={type}/>
            })}
        </>
    );
});

export default ExchangingSelectTodos;