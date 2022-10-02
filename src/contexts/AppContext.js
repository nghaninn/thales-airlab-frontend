import React, { createContext, useReducer } from "react"

export const AppContext = createContext()

const initialState = {
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_MENU":
            return {
                ...state,
                menu: action.payload,
            }
        default:
    }
}

const AppContextProvider = (props) => {
    const [appState, dispatch] = useReducer(reducer, initialState);

    // Actions
    const actionLogin = (user, loginType = null) => {
    }

    return (
        <AppContext.Provider value={{ appState }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider