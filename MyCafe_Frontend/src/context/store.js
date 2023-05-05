/** @format */

import React, { useReducer, createContext } from "react"

function reducer(state, action) {
    switch (action.type) {
        case "ERRORS":
            return {
                ...state,
                error: action.payload,
            }
        case "SUCCESS":
            return {
                ...state,
                success: action.payload,
            }
        default:
            return { ...state }
    }
}

const initialState = {
    error: "",
    success: "",
    loading: false,
}

// Create a counter context, initally storing the initialState
const Context = createContext(initialState)

// Create a provider to pass down the
const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{ state, dispatch }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provider }
