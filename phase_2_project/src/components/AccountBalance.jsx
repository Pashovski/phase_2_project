import React from 'react'
import { useState } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function AccountBalance({balance, accountNumber, accountType, setAccountId, id, accountId}) {
const [selectedAccount, setSelectedAccount] = useState(true)
    return (
    <Card.Group>
        <Card>
        <Card.Content>
            <Image
            floated='right'
            size='mini'
            src='https://w1.pngwing.com/pngs/842/376/png-transparent-piggy-bank-finance-saving-money-savings-bank-investment-bank-account-logo-thumbnail.png'
            />
            <Card.Header>{accountNumber}</Card.Header>
            <Card.Meta>{accountType}</Card.Meta>
            <Card.Description>
            ${balance}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
            <Button basic color='green' onClick={() => {
                    setAccountId(id)
                    setSelectedAccount(!selectedAccount)
                }}>{id ===  accountId ? "Current Account" : "Show Details"}
            </Button>
            </div>
        </Card.Content>
        </Card>
    </Card.Group>
    )
}
