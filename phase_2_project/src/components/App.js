import { useState, useEffect } from "react";
import AccountBalance from "./AccountBalance";
import StatementContainer from "./StatementContainer";
// import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  const [accountData, setAccountData] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [accountId, setAccountId] = useState(1)

  useEffect(() => {
    fetch('http://localhost:4000/transactions')
    .then(resp => resp.json())
    .then(data => setTransactionData(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/Account')
    .then(resp => resp.json())
    .then(data => setAccountData(data))
  },[])
  
  function postTransaction(money){
    fetch('http://localhost:4000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(money)
    })
    .then(resp => resp.json())
    .then(data => {
      setTransactionData([data, ...transactionData])
    })
  }
  
  return (
    <div>
      {accountData.map(details => {
        return (
          <AccountBalance key={details.id} balance={details.balance} accountNumber={details.accountNumber} accountType={details.accountType} setAccountId={setAccountId} id={details.id} accountId={accountId}/>
        )
      })}
      <StatementContainer postTransaction={postTransaction} transactionData={transactionData} accountId={accountId} setTransactionData={setTransactionData}/>
    </div>
  );
}

export default App;
