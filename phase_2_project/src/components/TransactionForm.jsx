import {useState} from 'react'
import React from 'react'
import { Button, Input, Form, Select, TextArea } from 'semantic-ui-react'



export default function TransactionForm({postTransaction, accountId, patchMinus, patchPlus, accountData, balance}) {
    const [newTransaction, setNewTransaction] = useState({
        "type": "Deposit",
        "userNotes":"",
        "amount": 0,
        "date":"",
        "currency":"",
        "accountId": accountId
    })



    console.log(accountId)
    console.log(newTransaction)

    function handleSubmit(e){
        // console.log(newTransaction)
        e.preventDefault()
        newTransaction.amount = +newTransaction.amount
        newTransaction.accountId = accountId
        postTransaction(newTransaction)
        if (newTransaction.type === "Deposit"){
            const newPlusValue = balance + newTransaction.amount
            patchPlus(newTransaction, newPlusValue)
        } else {
            
            const newMinusValue = balance - newTransaction.amount
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
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                {/* <Form.Select
                fluid
                label='Transaction Type'
                options={options}
                placeholder='Transaction Type'
                name="type"
                value={newTransaction.type}
                onChange={(e) => console.log(e.target.value)}
                /> */}
                <Form.Field label='Transaction Type' control='select' name="type" placeholder='Transaction Type' onChange={handleChange}>
                    <option value='Deposit'>Deposit</option>
                    <option value='Withdrawl'>Withdrawl</option>
                    <option value='Transfer'>Transfer</option>
                </Form.Field>
                <Form.Input
                fluid
                label='Notes'
                placeholder='Notes'
                name="userNotes"
                value={newTransaction.userNotes}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label='Amount'
                placeholder='Amount'
                name="amount"
                value={newTransaction.amount}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label='Date'
                placeholder='mm/dd/yyyy'
                name="date"
                value={newTransaction.date}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label='Currency'
                placeholder='Currency'
                name="currency"
                value={newTransaction.currency}
                onChange={handleChange}
                />
                <Form.Button>Submit</Form.Button>
            </Form.Group> 
        </Form>
    )
}
