import { useState } from "react";
import { Form } from "semantic-ui-react";

function TransferForm({details, setOtherAccountId, otherAccountId, accountId, patchOutgoingBalance, accountData}){
    
    const [balanceAccount, setBalanceAccount] = useState()
    const [otherBalanceAccount, setOtherBalanceAccount] = useState()


    const [newTransfer, setNewTransfer] = useState({
        "outboundAccount": "",
        "inboundAccount": "",
        "amount": "",
        "accountBalance": 0,
        "secondAccountBalance": 0
    })



    function handleTransferSubmit(e){
        e.preventDefault()
        
        if (newTransfer.outboundAccount === "4820"){
            const newAccountId = 1
            const newOtherAccountId = 2
            newTransfer.amount= +newTransfer.amount
            newTransfer.accountBalance= accountData[0].balance
            newTransfer.secondAccountBalance= accountData[1].balance
            const outgoingBalance = newTransfer.accountBalance - newTransfer.amount
            const inboundBalance = newTransfer.secondAccountBalance + newTransfer.amount
            patchOutgoingBalance(newAccountId, outgoingBalance, newOtherAccountId, inboundBalance)
            // patchInboundBalance(otherAccountId, inboundBalance)
        } else { 
            const twoNewAccount = 2
            const twoOtherNewAccount = 1
            newTransfer.amount= +newTransfer.amount
            newTransfer.accountBalance= accountData[1].balance
            newTransfer.secondAccountBalance= accountData[0].balance
            const twoOutgoingBalance = newTransfer.accountBalance - newTransfer.amount
            const twoInboundBalance = newTransfer.secondAccountBalance + newTransfer.amount
            console.log(twoInboundBalance)
            patchOutgoingBalance(twoOtherNewAccount, twoInboundBalance, twoNewAccount, twoOutgoingBalance)
            // patchInboundBalance(otherAccountId, twoInboundBalance)
        }
        newTransfer.amount = +newTransfer.amount




    }

    function handleTransferChange(e){
        setNewTransfer({
            ...newTransfer,
            [e.target.name]: e.target.value
        })
    }

    return(
    <Form onSubmit={handleTransferSubmit}>
        <Form.Group widths='equal'>
            <Form.Input
            fluid
            label='Account Transfering From'
            placeholder='Account Number'
            name='outboundAccount'
            value={newTransfer.outboundAccount}
            onChange={handleTransferChange}
            />
            <Form.Input
            fluid
            label='Account Transfering To'
            placeholder='Account Number'
            name='inboundAccount'
            value={newTransfer.inboundAccount}
            onChange={handleTransferChange}
            />
            <Form.Input
            fluid
            label='Amount Transfering'
            placeholder='Amount'
            name='amount'
            value={newTransfer.amount}
            onChange={handleTransferChange}
            />
            <Form.Button>Submit</Form.Button>
        </Form.Group>
    </Form>
    )
}

export default TransferForm;