function Summary({ totalSpent, totalPaid, budget }) {

    const remaining = budget - totalSpent

    return (
        <>
            <h2>Total Spent: ₹{totalSpent}</h2>
            <h2>Total Budget: ₹{budget}</h2>
            <h2 style={{ color: remaining < 0 ? 'red' : 'green' }}>
                Remaining: ₹{remaining}
            </h2>
            <h2> Total Paid: {totalPaid}</h2>
        </>
    )
}

export default Summary