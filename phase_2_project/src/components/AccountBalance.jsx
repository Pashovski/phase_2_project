import React from 'react'
import { useState } from 'react'
import TransactionForm from './TransactionForm'

export default function AccountBalance({balance, accountNumber, accountType, setAccountId, id, accountId}) {
const [selectedAccount, setSelectedAccount] = useState(true)
    return (
        <div>
            <h2>{accountNumber}</h2>
            <h3>{accountType}</h3>
            <p>${balance}</p>
            <button onClick={() => {
                setAccountId(id)
                setSelectedAccount(!selectedAccount)
            }}>{id ===  accountId ? "Current Account" : "Show Details"}</button>
        </div>
    )
}
