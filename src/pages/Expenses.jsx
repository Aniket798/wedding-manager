import { useContext, useState, useEffect } from 'react'
import BudgetSection from '../components/BudgetSection'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Summary from '../components/Summary'
import { ExpenseContext } from '../context/ExpenseContext'
import { useExpenses } from '../hooks/useExpenses'
import { useBudget } from '../hooks/useBudget'


function Expenses() {
    console.log("Expenses Render");
    const { state, dispatch } = useContext(ExpenseContext)
    const [formData, setFormData] = useState({
        title: '',
        category: 'Food',
        amount: '',
        paid: '',
        date: '',
        notes: ''
    })
    useExpenses()
    useBudget()
    const handleEdit = (expense) => {
        setFormData({
            title: expense.title,
            category: expense.category,
            amount: expense.amount,
            paid: expense.paid,
            date: expense.date,
            notes: expense.notes
        })
        dispatch({
            type: 'SET_EDITING_ID',
            payload: expense.id
        })

    }

    const totalSpent = state.expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    )

    const totalPaid = state.expenses.reduce(
        (sum, item) => sum + item.paid,
        0
    )


    return (
        <div >
            <div style={{
                background: "#f0f2f5",
                minHeight: "100vh",
                padding: "40px"
            }}
            >
                <h1 style={{ textAlign: "center" }}>
                    Wedding Expense Manager
                </h1>

                <BudgetSection
                    budget={state.budget}
                    dispatch={dispatch}
                />
                <Summary
                    totalSpent={totalSpent}
                    totalPaid={totalPaid}
                    budget={state.budget} />
                <ExpenseForm
                    formData={formData}
                    setFormData={setFormData}
                />

                <ExpenseList handleEdit={handleEdit} />
            </div>
        </div>
    )
}

export default Expenses
