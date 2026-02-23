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
        case 'LOAD_EXPENSES':
            return {
                ...state,
                expenses: action.payload
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
        fetch('http://localhost:5000/expenses')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'LOAD_EXPENSES',
                    payload: data
                })
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/budget')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    dispatch({
                        type: 'SET_BUDGET',
                        payload: data[0].total
                    })
                }
            })
    }, [])




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

        fetch(`http://localhost:5000/expenses/${id}`, {
            method: 'DELETE'
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

        const expenseData = {
            id: state.editingId || Date.now(),
            ...formData,
            amount: Number(formData.amount)
        }


        if (state.editingId) {
            fetch(`http://localhost:5000/expenses/${state.editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData)
            })
                .then(() => {
                    dispatch({
                        type: 'UPDATE_EXPENSE',
                        payload: expenseData
                    })
                })

        } else {
            fetch('http://localhost:5000/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData)
            })
                .then(() => {
                    dispatch({
                        type: 'ADD_EXPENSE',
                        payload: expenseData
                    })
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
                    onChange={(e) => {
                        const value = Number(e.target.value)

                        dispatch({
                            type: 'SET_BUDGET',
                            payload: value
                        })

                        fetch('http://localhost:5000/budget', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ total: value })
                        })
                    }}
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
                            {state.editingId === exp.id
                                ? "pending update..."
                                : "Edit Expense"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Expenses
