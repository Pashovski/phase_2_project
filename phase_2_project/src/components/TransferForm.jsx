import { useState } from "react";
import { Form } from "semantic-ui-react";

function TransferForm({details, setOtherAccountId, otherAccountId, accountId, patchOutgoingBalance, accountData, patchInboundBalance}){
    
    const [balanceAccount, setBalanceAccount] = useState()
    const [otherBalanceAccount, setOtherBalanceAccount] = useState()


    const [newTransfer, setNewTransfer] = useState({
        "outboundAccount": "",
        "inboundAccount": "",
        "amount": ""
    })



    function handleTransferSubmit(e){
        e.preventDefault()
        
        if (newTransfer.outboundAccount === "4820"){
            accountId = 1
            setOtherAccountId(accountId === 1 ? 2 : 1)
            setBalanceAccount(accountData[0].balance)
            setOtherBalanceAccount(accountData[1].balance)
        } else { 
            accountId = 2
            setOtherAccountId(accountId === 1 ? 2 : 1)
            setBalanceAccount(accountData[0].balance)
            setOtherBalanceAccount(accountData[1].balance)
        }
        newTransfer.amount = +newTransfer.amount

        console.log(newTransfer.amount)

        const outgoingBalance = balanceAccount - newTransfer.amount
        const inboundBalance = otherBalanceAccount + newTransfer.amount
        patchOutgoingBalance(accountId, outgoingBalance)
        patchInboundBalance(otherAccountId, inboundBalance)
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