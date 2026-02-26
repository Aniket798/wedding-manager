import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

function ExpenseList({handleEdit}) {
    console.log("ExpenseList Render");
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

   
    return (
        <ul>
            {state.expenses.map(exp => (
                <li key={exp.id}>
                    <strong>{exp.title}</strong><br />
                    Category: {exp.category} <br />
                    Total: ₹{exp.amount} <br />
                    Paid: ₹{exp.paid} <br />
                    Date: {exp.date} <br />
                    <span style={{
                        color: exp.amount - exp.paid > 0 ? 'red' : 'green'
                    }}>
                        Remaining: ₹{exp.amount - exp.paid}
                    </span> <br />


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