import {createContext, useState} from "react";


const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
    const [uris, setUris] = useState([]);
    

    return (
        <ScreensContext.Provider value ={{ uris, setUris }}>
            {children}
        </ScreensContext.Provider>
    )
}

export default ScreensContext;