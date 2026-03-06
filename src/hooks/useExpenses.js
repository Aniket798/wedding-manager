import { useEffect, useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

export function useExpenses() {

  const { state, dispatch } = useContext(ExpenseContext)

  useEffect(() => {
    fetch('https://wedding-backend-production-aa63.up.railway.app/expenses')
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