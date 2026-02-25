import { createContext, useReducer } from 'react'

export const ExpenseContext = createContext()

const initialState = {
    expenses: [],
    budget: '',
    editingId: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }

        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(
                    exp => exp.id !== action.payload
                )
            }

        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(exp =>
                    exp.id === action.payload.id
                        ? action.payload
                        : exp
                ),
                editingId: null
            }

        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload
            }

        case 'SET_EDITING_ID':
            return {
                ...state,
                editingId: action.payload
            }

        case 'LOAD_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            }

        default:
            return state
    }
}

export function ExpenseProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ExpenseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    )
}