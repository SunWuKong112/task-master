import React from 'react'

export const StoreContext = React.createContext(null)

export default ({children}) => {
     const [currentUser, setUser] = React.useState('null');

     return <StoreContext.Provider value={{currentUser, setUser}}>{children}</StoreContext.Provider>
}