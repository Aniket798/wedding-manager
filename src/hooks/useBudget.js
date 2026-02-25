import { useEffect, useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

export function useBudget() {
    const { state, dispatch } = useContext(ExpenseContext)

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
    }, [dispatch])
    return {
    budget: state.budget
  }
}
