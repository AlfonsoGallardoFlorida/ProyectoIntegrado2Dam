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
    const [ allUpgrades, setAllUpgrades ] = useState([]);
    const [ pointsPerSecond, setPointsPerSecond] = useState(0);
    const [isMoonMoving, setIsMoonMoving] = useState(true);

    return (
        <ScreensContext.Provider value ={{ 
         uris, setUris,
         areConstellationsVisible, setAreConstellationsVisible,
         coin, setCoin,
         cantClicks, setCantClicks,
         userInfo, setUserInfo,
         tapsPerSecond, setTapsPerSecond,
         pointsPerClick, setPointsPerClick,
         upgradesUnlocked, setUpgradesUnlocked,
         allUpgrades, setAllUpgrades,
         pointsPerSecond,setPointsPerSecond,
         isMoonMoving, setIsMoonMoving,

          }}>
            {children}
        </ScreensContext.Provider>
    )
}

export default ScreensContext;