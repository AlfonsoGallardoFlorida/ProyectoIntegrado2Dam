import {createContext, useState} from "react";


const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
    const [ uris, setUris ] = useState([]);
    const [ areConstellationsVisible, setAreConstellationsVisible ] = useState(true);
    const [ coin, setCoin ] = useState(0);
    const [ cantClicks, setCantClicks ] = useState(0);
    const [ userInfo, setUserInfo ] = useState(undefined);
    const [ tapsPerSecond, setTapsPerSecond ] = useState(0);
    const [ pointsPerClick, setPointsPerClick ] = useState(1);
    const [ upgradesUnlocked, setUpgradesUnlocked ] = useState([]);

    return (
        <ScreensContext.Provider value ={{ 
         uris, setUris,
         areConstellationsVisible, setAreConstellationsVisible,
         coin, setCoin,
         cantClicks, setCantClicks,
         userInfo, setUserInfo,
         tapsPerSecond, setTapsPerSecond,
         pointsPerClick, setPointsPerClick,
         upgradesUnlocked, setUpgradesUnlocked
          }}>
            {children}
        </ScreensContext.Provider>
    )
}

export default ScreensContext;