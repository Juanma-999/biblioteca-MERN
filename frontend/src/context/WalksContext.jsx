import { createContext, useState } from "react";

export const WalksContext = createContext();

const WalksProvider = ({ children }) => {
    const [walks, setWalks] = useState([]);

    return <WalksContext.Provider value={{ walks, setWalks }}>
        { children }
    </WalksContext.Provider>
};

export default WalksProvider;


