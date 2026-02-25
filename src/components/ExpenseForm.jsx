import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

function ExpenseForm({ formData, setFormData }) {
    const { state, dispatch } = useContext(ExpenseContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
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

    return (
        <form onSubmit={state.handleSubmit}>
            <h1>Add wedding Details</h1>
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
                placeholder="price"
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
                placeholder="notes"
                value={formData.notes}
                onChange={handleChange}
            />

            <button type="submit">
                {state.editingId ? "Update Expense" : "Add Expense"}
            </button>
        </form>
    )
}

export default ExpenseForm