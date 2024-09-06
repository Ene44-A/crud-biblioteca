import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";
import { db } from "../fireBase/config";

export const valueContext = createContext();

export const ValueContext = ({children}) => { 

    const [stateMain, setStateMain] = useState(false);
    
    const getDataTime = () => {
        const fechaActual = new Date();
        const fecha = fechaActual.toLocaleDateString();
        const hora = fechaActual.toLocaleTimeString();
        return {fecha, hora};
    };

    const handleSatateMain = () => {
        setStateMain(!stateMain);
    }
    console.log(stateMain);
    
    
    return (
        <valueContext.Provider value={{handleSatateMain, stateMain, getDataTime }}>
            {children}
        </valueContext.Provider>
    );
}