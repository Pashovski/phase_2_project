import React from 'react'
import StatementCard from './StatementCard'
import TransactionForm from './TransactionForm'

export default function StatementContainer({ postTransaction, transactionData, accountId, setTransactionData}) {

    return (
        <div>
            <TransactionForm postTransaction={postTransaction} accountId={accountId}/>
            {/* <button onClick={() => setTransactionData(() => {
                console.log(transactionData.type)
                transactionData.sort((a, b) => a[transactionData.type] - [b.transactionData.type])})}>Sort by Transaction</button> */}
            {transactionData.filter(transaction => transaction.accountId === accountId).map(details => {
                // details.transactions.map(trans => {
                //     return(
                //         <StatementCard trans={trans}/>
                //     )
                // })\
                return(
                <StatementCard trans={details}/>  
            )})}
            
        </div>
    )
}
