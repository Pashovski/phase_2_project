import React from 'react'

export default function StatementCard({trans}) {
    return(
    <div>
        <h2>{trans.type}</h2>
        <h3>{trans.amount}</h3>
        <p>{trans.userNotes}</p>
        <p>{trans.date}</p>
        <p>{trans.currency}</p>
        <p>{trans.accountNumber}</p>
    </div>)
    }
