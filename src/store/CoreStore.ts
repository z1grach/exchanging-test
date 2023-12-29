import {makeAutoObservable} from 'mobx';
import {ICurrency} from "../types";

export default class CoreStore {
    currency: ICurrency[] = [];
    currencyFrom: ICurrency | null = null;
    currencyTo: ICurrency | null = null;

    minExchange: number = 0;
    estimatedExchange: string = '';

    showList: string = '';

    loading: boolean = false;

    pairDisable: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setPairDisable(data: boolean) {
        this.pairDisable = data;
    }

    setLoading(data: boolean) {
        this.loading = data;

        if (this.showList) this.showList = '';
    }

    setShowList(data: string) {
        this.showList = data;
    }

    setCurrency(data: ICurrency[]) {
        this.currency = data;

        this.currencyFrom = this.currency[0];
        this.currencyTo = this.currency[1];
    }

    setCurrencyFrom(data: ICurrency) {
        this.currencyFrom = data;
    }

    setCurrencyTo(data: ICurrency) {
        this.currencyTo = data;
    }

    changeCurrentCurrency() {
        [this.currencyFrom, this.currencyTo] = [this.currencyTo, this.currencyFrom];
    }

    setMinExchange(data: number) {
        this.minExchange = data;
    }

    setEstimatedExchange(data: string) {
        this.estimatedExchange = data;
    }
}
