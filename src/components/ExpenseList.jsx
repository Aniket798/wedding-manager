import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

function ExpenseList() {
    const { state, dispatch } = useContext(ExpenseContext)

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
        dispatch({
            type: 'SET_EDITING_ID',
            payload: expense.id
        })
    }
    return (
        <ul>
            {state.expenses.map(exp => (
                <li key={exp.id}>
                    {exp.title} - ₹{exp.amount} ({exp.category})

                    <button className="btn-primary" style={{ background: "red", color: "white" }} onClick={() => handleDelete(exp.id)}>
                        Delete
                    </button>

                    <button onClick={() => handleEdit(exp)}>
                        {state.editingId === exp.id
                            ? "Pending Update..."
                            : "Edit Expense"}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default ExpenseList