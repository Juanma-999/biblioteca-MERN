import { createContext, useState } from "react";

export const DogContext = createContext();

const DogProvider = ({ children }) => {
    const [dogs, setDogs] = useState([]);

    return <DogContext.Provider value={{ dogs, setDogs }}>
        { children }
    </DogContext.Provider>
};

export default DogProvider;
