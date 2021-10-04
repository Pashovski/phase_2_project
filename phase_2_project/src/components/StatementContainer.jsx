import React from 'react'
import StatementCard from './StatementCard'
import TransactionForm from './TransactionForm'

export default function StatementContainer() {
    return (
        <div>
           <p> I am statment container</p>
            <StatementCard/>
            <TransactionForm/>
        </div>
    )
}
