import {useState} from 'react'
import React from 'react'

export default function TransactionForm({postTransaction}) {
    const [newTransaction, setNewTransaction] = useState({
        "type":"",
        "userNotes":"",
        "amount":0,
        "date":"",
        "currency":""
    })
    function handleSubmit(e){
        e.preventDefault()
        postTransaction(newTransaction)

    }
    function handleChange(e){
        setNewTransaction( {
            ...newTransaction,
            [e.target.name]: e.target.value

            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={newTransaction.type} onChange={handleChange}>
                    <option value={newTransaction.type}>Deposit</option>
                    <option value={newTransaction.type}>Withdraw</option>
                    <option value={newTransaction.type}>Transfer</option>
                </select>
                <input placeholder="Notes" type="text" name="userNotes" value={newTransaction.userNotes} onChange={handleChange}/>
                <input placeholder="Amount" type="number" name="amount" value={newTransaction.amount} onChange={handleChange}/>
                <input placeholder="mm/dd/yyyy" type="text" name="date" value={newTransaction.date} onChange={handleChange}/>
                <input placeholder="Currency" type="text" name="currency" value={newTransaction.currency} onChange={handleChange}USD/>
                <input type="submit" value="Complete Transaction" />
            </form>
        </div>
    )
}
