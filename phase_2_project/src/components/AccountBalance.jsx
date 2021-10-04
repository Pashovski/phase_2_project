import React from 'react'

export default function AccountBalance({balance, accountNumber, accountType,}) {
    return (
        <div>
            <h2>{accountNumber}</h2>
            <h3>{accountType}</h3>
            <p>${balance}</p>
        </div>
    )
}
