import React from 'react'

export const StoreContext = React.createContext(null)

// Provides global access to the currentUser object for application
export default ({children}) => {
     const [currentUser, setUser] = React.useState([]);

     return <StoreContext.Provider value={{currentUser, setUser}}>{children}</StoreContext.Provider>
}