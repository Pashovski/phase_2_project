import { useState } from "react";
import { Form } from "semantic-ui-react";

function TransferForm({details, setOtherAccountId, otherAccountId, accountId, patchBalance}){
    setOtherAccountId(accountId === 1 ? 2 : 1)
    const [newTransfer, setNewTransfer] = useState({
        "outboundAccount": "",
        "inboundAccount": "",
        "amount": ""
    })

    function handleTransferSubmit(e){
        e.preventDefault()
        
        patchBalance()
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