import React from 'react'
import { useState } from 'react'

export default function StatementCard({trans}) {
    const [hideTransaction, setHideTransaction] = useState(true)

    return(
    <div>
        <button onClick={() => setHideTransaction(!hideTransaction)}>{hideTransaction ? "Minimize Transaction" : "Show Transaction"}</button>
            {hideTransaction ? 
            <div>
                <h2>{trans.type}</h2>
                <h3>{trans.amount}</h3>
                <p>{trans.userNotes}</p>
                <p>{trans.date}</p>
                <p>{trans.currency}</p>
                <p>{trans.accountNumber}</p> 
            </div>
            : null }
    </div>)
    }
