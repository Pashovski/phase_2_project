import React from 'react'
import StatementCard from './StatementCard'
import TransactionForm from './TransactionForm'

export default function StatementContainer({accountData}) {

    return (
        <div>
            {accountData.map(details => {
                console.log(details.transactions)
                // details.transactions.map(trans => {
                //     return(
                //         <StatementCard trans={trans}/>
                //     )
                // })\
                return(
                <StatementCard trans={details.transactions}/>  
            )})}
            <TransactionForm/>
        </div>
    )
}
