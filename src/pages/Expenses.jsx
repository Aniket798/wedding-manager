import { useEffect, useState } from 'react'

function Expenses() {
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('expenses')
        return saved ? JSON.parse(saved) : []
    })

    const [formData, setFormData] = useState({
        title: '',
        category: 'Food',
        amount: '',
        date: '',
        notes: ''
    })
    const [editingId, setEditingId] = useState(null)
    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem('budget')
        return savedBudget ? JSON.parse(savedBudget) : ''
    })

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget))
    }, [budget])




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
    const handleEdit = (expense) => {
        setFormData(expense)
        setEditingId(expense.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (editingId) {
            setExpenses(prev =>
                prev.map(exp =>
                    exp.id === editingId
                        ? { ...exp, ...formData }
                        : exp
                )
            )
            setEditingId(null)
        } else {
            const newExpense = {
                id: Date.now(),
                ...formData,
                amount: Number(formData.amount)
            }
            setExpenses(prev => [...prev, newExpense])
        }

        setFormData({
            title: '',
            category: 'Food',
            amount: '',
            date: '',
            notes: ''
        })

    }
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0)
    const remaining = budget - totalSpent



    return (
        <div>
            <h1>Wedding Expenses</h1>
            <div>
                <h2>Set Wedding Budget</h2>
                <input
                    type="number"
                    placeholder="Enter total budget"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
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
            <h2>Total Budget: ₹{budget}</h2>
            <h2>Total Spent: ₹{totalSpent}</h2>
            <h2 style={{ color: remaining < 0 ? 'red' : 'green' }}>
                Remaining: ₹{remaining}
            </h2>
            <ul>
                {expenses.map(exp => (
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
