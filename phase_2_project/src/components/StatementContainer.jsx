import React from 'react'
import StatementCard from './StatementCard'
import TransactionForm from './TransactionForm'

export default function StatementContainer({ postTransaction,accountData}) {

    return (
        <div>
            <TransactionForm postTransaction={postTransaction}/>
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
            
        </div>
    )
}
