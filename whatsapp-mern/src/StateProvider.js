import React, {createContext, useContext, useReducer } from "react";

// Preparing the data layer 
export const StateContext = createContext();

// The data layer - Higher order component 
export const StateProvider = ({ reducer, initialState, children }) => (
    // Allows us to actually setup the data layer 
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {/* The <App /> child  */}
        {children}
    </StateContext.Provider>
);

// Allows us to pull information from the data layer 
export const useStateValue = () => useContext(StateContext); 