import { useState } from 'react'

function Expenses() {
    const [expenses, setExpenses] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        category: 'Food',
        amount: '',
        date: '',
        notes: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = (id) => {
        setExpenses(prev =>
            prev.filter(exp => exp.id !== id)
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newExpense = {
            id: Date.now(),
            ...formData,
            amount: Number(formData.amount)
        }
        setExpenses(prev => [...prev, newExpense])
        setFormData({
            title: '',
            category: 'Food',
            amount: '',
            date: '',
            notes: ''
        })
    }
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0)


    return (
        <div>
            <h1>Wedding Expenses</h1>

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

            <ul>
                {expenses.map(exp => (
                    <li key={exp.id}>
                        {exp.title} - ₹{exp.amount} ({exp.category})
                    </li>
                ))}
            </ul>

            <ul>
                {expenses.map(exp => (
                    <li key={exp.id}>
                        {exp.title} - ₹{exp.amount} ({exp.category})
                        <button onClick={() => handleDelete(exp.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Expenses
