import React from 'react'

export default function StatementCard({trans}) {
    console.log(trans.transactions)
    const display = trans.map(tran => {
    return(
    <div>
        <h2>{tran.type}</h2>
        <h3>{tran.amount}</h3>
        <p>{tran.userNotes}</p>
        <p>{tran.date}</p>
        <p>{tran.currency}</p>
        <p>{tran.accountNumber}</p>
    </div>)})
    return display
}
