import { useReducer, useState, useEffect } from 'react'

/* 1️⃣ Initial State */
const initialState = {
    expenses: [],
    budget: '',
    editingId: null
}

/* 2️⃣ Reducer Function */
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

        default:
            return state
    }
}
function Expenses() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const [formData, setFormData] = useState({
        title: '',
        category: 'Food',
        amount: '',
        date: '',
        notes: ''
    })
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(state.JSONexpenses))
    }, [state.expenses])

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(state.budget))
    }, [state.budget])




    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id
        })
    }
    const handleEdit = (expense) => {
        setFormData(expense)
        dispatch({
            type: 'SET_EDITING_ID',
            payload: expense.id
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (state.editingId) {
            dispatch({
                type: 'UPDATE_EXPENSE',
                payload: {
                    id: state.editingId,
                    ...formData,
                    amount: Number(formData.amount)
                }
            })

        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: {
                    id: Date.now(),
                    ...formData,
                    amount: Number(formData.amount)
                }
            })
        }

        setFormData({
            title: '',
            category: 'Food',
            amount: '',
            date: '',
            notes: ''
        })

    }
    const totalSpent = state.expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    )
    const remaining = state.budget - totalSpent



    return (
        <div>
            <h1>Wedding Expenses</h1>
            <div>
                <h2>Set Wedding Budget</h2>
                <input
                    type="number"
                    placeholder="Enter total budget"
                    value={state.budget}
                    onChange={(e) => dispatch({
                        type: 'SET_BUDGET', 
                        payload: Number(e.target.value)
                    })}
                />
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option>Food</option>
                    <option>Venue</option>
                    <option>Clothes</option>
                    <option>Gifts</option>
                    <option>Travel</option>
                </select>

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <button type="submit">Add Expense</button>
            </form>

            <h2>Total Spent: ₹{totalSpent}</h2>
            <h2>Total Budget: ₹{state.budget}</h2>
            <h2 style={{ color: remaining < 0 ? 'red' : 'green' }}>
                Remaining: ₹{remaining}
            </h2>
            <ul>
                {state.expenses.map(exp => (
                    <li key={exp.id}>
                        {exp.title} - ₹{exp.amount} ({exp.category})
                        <button onClick={() => handleDelete(exp.id)}>
                            Delete
                        </button>
                        <button onClick={() => handleEdit(exp)}>
                            {editingId ? "pending update..." : "Edit Expense"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Expenses
