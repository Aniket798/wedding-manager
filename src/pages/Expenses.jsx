import { useContext, useState, useEffect } from 'react'
import BudgetSection from '../components/BudgetSection'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Summary from '../components/Summary'
import { ExpenseContext } from '../context/ExpenseContext'


function Expenses() {
    const { state, dispatch } = useContext(ExpenseContext)
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

    const totalSpent = state.expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    )

    return (
        <div>
            <h1>Wedding Expenses</h1>

            <BudgetSection
                budget={state.budget}
                dispatch={dispatch}
            />

            <ExpenseForm
                formData={formData}
                setFormData={setFormData}
            />

            <ExpenseList
            />
            <Summary
                totalSpent={totalSpent}
                budget={state.budget} />
        </div >
    )
}

export default Expenses
