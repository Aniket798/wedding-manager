import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

function ExpenseList({ handleEdit }) {
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

    const getStatus = (exp) => {
        if (exp.paid === 0)
            return { label: "Not Paid", bg: "#ff4d4f" };

        if (exp.paid < exp.amount)
            return { label: "Partial", bg: "#faad14" };

        if (exp.paid > exp.amount)
            return { label: "Overpaid", bg: "#722ed1" };

        return { label: "Fully Paid", bg: "#52c41a" };
    };


    return (
        <ul style={{ padding: 0, maxWidth: "600px", margin: "20px auto" }}>
            {state.expenses.map(exp => (
                <li key={exp.id}
                    style={{
                        background: "#ffffff",
                        padding: "15px",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        listStyle: "none"
                    }}>
                    <strong style={{ fontSize: "18px" }}>{exp.title}</strong>
                    <div style={{ marginTop: "5px", color: "#555" }}>
                        Category: {exp.category}
                    </div>
                    <span>
                        {getStatus(exp).label}
                    </span>
                    <div>Total: ₹{exp.amount}</div>
                    <div>Paid: ₹{exp.paid}</div>
                    Date: {exp.date} <br />
                    <span style={{
                        color: exp.amount - exp.paid > 0 ? 'green' : 'red'
                    }}>
                        Remaining: ₹{exp.amount - exp.paid}
                    </span> <br />


                    <div style={{ marginTop: "10px" }}>
                        <button
                            style={{
                                background: "#ff4d4f",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                marginRight: "8px",
                                cursor: "pointer"
                            }}
                            onClick={() => handleDelete(exp.id)}
                        >
                            Delete
                        </button>

                        <button
                            style={{
                                background: "#1677ff",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                            onClick={() => handleEdit(exp)}
                        >
                            {state.editingId === exp.id
                                ? "Updating..."
                                : "Edit"}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ExpenseList