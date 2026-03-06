import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

function BudgetSection() {
    const { state, dispatch } = useContext(ExpenseContext)

    const inputStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
        marginTop: "10px"
    };

    return (
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            margin: "20px auto"
        }}>
            <h3 style={{ marginBottom: "10px" }}>Set Wedding Budget</h3>

            <input
                type="number"
                value={state.budget}
                style={inputStyle}
                onChange={(e) => {
                    const value = Number(e.target.value)

                    dispatch({
                        type: 'SET_BUDGET',
                        payload: value
                    })
                     //http://192.168.1.8:5000/budget
                    fetch('https://wedding-backend-production-aa63.up.railway.app/budget', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ total: value })
                    })
                }}
            />
            {state.budget > 0 && (
                <div
                    style={{
                        marginTop: "15px",
                        padding: "10px",
                        borderRadius: "6px",
                        background: "#f0f2f5",
                        fontSize: "14px"
                    }}
                >
                    Current Budget: <strong>₹{state.budget}</strong>
                </div>
            )}
        </div>
    )
}

export default BudgetSection