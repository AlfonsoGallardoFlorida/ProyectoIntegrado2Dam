import {createContext, useState} from "react";


const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
    const [uris, setUris] = useState([]);
    const [areConstellationsVisible, setAreConstellationsVisible] = useState(true);
    const [coin, setCoin] = useState(0);
    const [cantClicks, setCantClicks] = useState(0);
    const [userInfo, setUserInfo] = useState({});

    return (
        <ScreensContext.Provider value ={{ 
        uris, setUris,
         areConstellationsVisible, setAreConstellationsVisible,
         coin, setCoin,
         cantClicks, setCantClicks
          }}>
            {children}
        </ScreensContext.Provider>
    )
}

export default ScreensContext;