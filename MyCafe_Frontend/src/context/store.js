/** @format */

import React, { useReducer, createContext } from "react"

function reducer(state, action) {
    switch (action.type) {
        case "ERRORS":
            return {
                ...state,
                error: action.payload,
            };
        case "SUCCESS":
            return {
                ...state,
                success: action.payload,
            };
        case "CAFE_DATA":
            return {
                ...state,
                cafeData: [...action.payload],
            };
        case "EMPLOYEE_DATA":
            return {
                ...state,
                employeeData: [...action.payload],
            }
        default:
            return { ...state };
    }
}

const initialState = {
    error: "",
    success: "",
    loading: false,
    cafeData: [],
    employeeData: [],
};

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
