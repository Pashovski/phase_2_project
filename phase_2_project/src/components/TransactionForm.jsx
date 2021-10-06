import {useState} from 'react'
import React from 'react'

export default function TransactionForm({postTransaction, accountId, patchMinus, patchPlus, accountData}) {
    const [newTransaction, setNewTransaction] = useState({
        "type": "Deposit",
        "userNotes":"",
        "amount": 0,
        "date":"",
        "currency":"",
        "accountId": +`${accountId}`
    })

    function updateBalance(transactionNew){
        
    }   

    function handleSubmit(e){
        e.preventDefault()
        newTransaction.amount = +newTransaction.amount
        postTransaction(newTransaction)
        if (newTransaction.type === "Deposit"){

            patchPlus(newTransaction)
        } else {
            
            const newMinusValue = accountData.balance - newTransaction.amount
            patchMinus(newTransaction, newMinusValue)
        }
    }

    function handleChange(e){
        setNewTransaction( {
            ...newTransaction,
            [e.target.name]: e.target.value,
            })
        }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="type" value={newTransaction.type} onChange={handleChange}>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdawl">Withdrawl</option>
                    <option value="Transfer">Transfer</option>
                </select>
                <input placeholder="Notes" type="text" name="userNotes" value={newTransaction.userNotes} onChange={handleChange}/>
                <input placeholder="Amount" type="number" name="amount" value={newTransaction.amount} onChange={handleChange}/>
                <input placeholder="mm/dd/yyyy" type="text" name="date" value={newTransaction.date} onChange={handleChange}/>
                <input placeholder="Currency" type="text" name="currency" value={newTransaction.currency} onChange={handleChange}USD/>
                <input type="submit" value="Complete Transaction"/>
            </form>
        </div>
    )
}
