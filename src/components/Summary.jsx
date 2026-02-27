function Summary({ totalSpent, totalPaid, budget }) {

    const remaining = budget - totalSpent

    const cardStyle = {
        flex: 1,
        padding: "20px",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        textAlign: "center"
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                maxWidth: "900px",
                margin: "30px auto"
            }}
        > <div style={cardStyle}>
                <h3>Total Planned</h3>
                <h2>₹{budget}</h2>
            </div>
            <div style={cardStyle}>
                <h3>Total Spent</h3>
                <h2>₹{totalSpent}</h2>
            </div>
            <div style={cardStyle}>
                <h3>Remaining Budget</h3>
                <h2 style={{ color: remaining < 0 ? "red" : "green" }}>
                    ₹{remaining}
                </h2>
            </div>
            <div style={cardStyle}>
                <h3>Total Paid</h3>
                <h2 style={{ color: "#1677ff" }}>₹{totalPaid}</h2>
            </div>
        </div>
    )
}

export default Summary