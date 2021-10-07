import React from 'react'
import { useState } from 'react'
import { Segment } from 'semantic-ui-react'

export default function StatementCard({trans}) {
    const [hideTransaction, setHideTransaction] = useState(true)

    return(
    <div class="ui blue segment">
            {hideTransaction ? 
            <Segment.Group horizontal widths='equal'>
                <Segment>{trans.type}</Segment>
                <Segment>${trans.amount}</Segment>
                <Segment>{trans.userNotes}</Segment>
                <Segment>{trans.date}</Segment>
                <Segment>{trans.currency}</Segment>
                <Segment>{<button class="ui negative basic button" onClick={() => setHideTransaction(!hideTransaction)}>{hideTransaction ? "Minimize Transaction" : "Show Transaction"}</button>}</Segment> 
            </Segment.Group>
            : <Segment class="ui right aligned segment"> <button class="ui positive basic button" onClick={() => setHideTransaction(!hideTransaction)}>{hideTransaction ? "Minimize Transaction" : "Show Transaction"}</button></Segment>}
    </div>)
    }
