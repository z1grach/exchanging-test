import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import CoreStore from "./store/CoreStore";

interface AppContextType {
    coreStore: CoreStore;
}

export const Context = createContext<AppContextType>({
    coreStore: new CoreStore()
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            coreStore: new CoreStore()
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
);