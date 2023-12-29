import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ErrorPair = observer(() => {
    const {coreStore} = useContext(Context);

    if (coreStore.pairDisable) return <span>This pair is disabled now</span>;

    return <></>;
});

export default ErrorPair;