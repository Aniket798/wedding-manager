import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

function BudgetSection() {
    const { state, dispatch } = useContext(ExpenseContext)

    return (
        <div>
            <h2>Set Wedding Budget</h2>
            <input
                type="number"
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
    )
}

export default BudgetSection