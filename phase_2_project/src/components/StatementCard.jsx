import React from 'react'
import { useState } from 'react'

export default function StatementCard({trans}) {
    const [hideTransaction, setHideTransaction] = useState(true)

    return(
    <div>
            {hideTransaction ? 
            <div>
                <h3>{trans.type}</h3>
                <h4>${trans.amount}</h4>
                <p>{trans.userNotes}</p>
                <p>{trans.date}</p>
                <p>{trans.currency}</p>
                <p>{trans.accountNumber}</p> 
            </div>
            : null }
            <button onClick={() => setHideTransaction(!hideTransaction)}>{hideTransaction ? "Minimize Transaction" : "Show Transaction"}</button>
    </div>)
    }
