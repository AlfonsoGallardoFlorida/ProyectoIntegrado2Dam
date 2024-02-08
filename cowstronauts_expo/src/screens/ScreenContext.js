import {createContext, useState} from "react";


const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
    const [uris, setUris] = useState([]);
    const [areConstellationsVisible, setAreConstellationsVisible] = useState(true);
    

    return (
        <ScreensContext.Provider value ={{ uris, setUris, areConstellationsVisible, setAreConstellationsVisible }}>
            {children}
        </ScreensContext.Provider>
    )
}

export default ScreensContext;