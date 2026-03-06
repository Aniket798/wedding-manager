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

    const inputStyle = {
        width: "100%",
        padding: "8px",
        marginBottom: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc"
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const expenseData = {
            id: state.editingId || Date.now(),
            ...formData,
            amount: Number(formData.amount),
            paid: Number(formData.paid || 0)
        }

        //https://wedding-backend-production-aa63.up.railway.app/expenses
        //http://192.168.1.8:5000/expenses
        if (state.editingId) {
            fetch(`https://wedding-backend-production-aa63.up.railway.app/expenses/${state.editingId}`, {
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
            fetch('https://wedding-backend-production-aa63.up.railway.app/expenses', {
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
            paid: '',
            date: '',
            notes: ''
        })

    }

    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                maxWidth: "600px",
                margin: "20px auto"
            }}
        >
            <form onSubmit={handleSubmit}>
                <h1>Add wedding Details</h1>
                <input style={inputStyle}
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <select style={inputStyle}
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

                <input style={inputStyle}
                    type="number"
                    name="amount"
                    placeholder="price"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <input style={inputStyle}
                    type="number"
                    name="paid"
                    placeholder="Paid Amount"
                    value={formData.paid}
                    onChange={handleChange}
                />
                <input style={inputStyle}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <textarea style={inputStyle}
                    name="notes"
                    placeholder="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    style={{
                        background: "#1677ff",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        width: "100%",
                        fontWeight: "bold"
                    }}
                >
                    {state.editingId ? "Update Expense" : "Add Expense"}
                </button>
            </form>
        </div>
    )
}

export default ExpenseForm