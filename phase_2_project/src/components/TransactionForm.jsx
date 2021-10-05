import {useState} from 'react'
import React from 'react'

export default function TransactionForm({postTransaction, accountId}) {
    const [newTransaction, setNewTransaction] = useState({
        "type":"",
        "userNotes":"",
        "amount": 0,
        "date":"",
        "currency":"",
        "accountId": 0
    })
    const [transactionFormId, setTransactionFormId] = useState()

    function handleSubmit(e){
        e.preventDefault()
        postTransaction(newTransaction)

    }

    console.log(transactionFormId)

    function handleChange(e){
        setTransactionFormId(e.target.value);
        if (transactionFormId === "4820"){
            setTransactionFormId(1)
            setNewTransaction( {
                ...newTransaction,
                [e.target.name]: transactionFormId
    
                })
        } else if (e.target.value === "8096"){
            setTransactionFormId(2);
            setNewTransaction( {
                ...newTransaction,
                [e.target.name]: transactionFormId
    
                })
            }
        else {
        setNewTransaction( {
            ...newTransaction,
            [e.target.name]: e.target.value

            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={newTransaction.type} onChange={handleChange}>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdawl">Withdrawl</option>
                    <option value="Transfer">Transfer</option>
                </select>
                <input placeholder="Notes" type="text" name="userNotes" value={newTransaction.userNotes} onChange={handleChange}/>
                <input placeholder="Amount" type="number" name="amount" value={newTransaction.amount} onChange={handleChange}/>
                <input placeholder="mm/dd/yyyy" type="text" name="date" value={newTransaction.date} onChange={handleChange}/>
                <input placeholder="Currency" type="text" name="currency" value={newTransaction.currency} onChange={handleChange}USD/>
                <input placeholder="Account Number" type="number" name="accountId" value={newTransaction.accountId} onChange={handleChange}/>
                <input type="submit" value="Complete Transaction" />
            </form>
        </div>
    )
}
