import React from 'react'
import StatementCard from './StatementCard'
import TransactionForm from './TransactionForm'

export default function StatementContainer({ postTransaction, transactionData, accountId, setTransactionData, patchMinus, patchPlus, accountData}) {

    const arrayTypeCopy = [...transactionData]
    const sortedTypeArray = arrayTypeCopy.sort((a, b) => a.type > b.type ? 1 : -1)
    const arrayAmountCopy = [...transactionData]
    const sortedAmountArray = arrayAmountCopy.sort((a, b) => a.amount > b.amount ? 1 : -1)
    const arrayDateCopy = [...transactionData]
    const sortedDateArray = arrayDateCopy.sort((a, b) => a.date > b.date ? 1 : -1)

    return (
        <div>
            <TransactionForm postTransaction={postTransaction} accountId={accountId} patchMinus={patchMinus} patchPlus={patchPlus} accountData={accountData}/>
            <div>
                <button onClick={() => setTransactionData(() => {
                    return (sortedTypeArray)
                    })}>Sort by Transaction Type</button>
                <button onClick={() => setTransactionData(() => {
                    return (sortedAmountArray)
                    })}>Sort by Amount</button>
                <button onClick={() => setTransactionData(() => {
                    return (sortedDateArray)
                    })}>Sort by Date</button>
            </div>
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
