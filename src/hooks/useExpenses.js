import { useEffect, useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

export function useExpenses() {

  const { state, dispatch } = useContext(ExpenseContext)

  useEffect(() => {
    fetch('http://localhost:5000/expenses')
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'LOAD_EXPENSES',
          payload: data
        })
      })
  }, [dispatch])

  return {
    expenses: state.expenses
  }
}