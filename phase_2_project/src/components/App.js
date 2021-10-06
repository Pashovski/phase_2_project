import { useState, useEffect } from "react";
import AccountBalance from "./AccountBalance";
import StatementContainer from "./StatementContainer";
// import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  const [accountData, setAccountData] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [accountId, setAccountId] = useState()

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
    console.log(money)
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

  function patchMinus(tran, newBalance){
    console.log(tran.accountId)
    fetch(`http://localhost:4000/Account/${tran.accountId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalance})
    })
    .then(resp => resp.json())
    .then(updatedAccount => {
      const updatedAccountList = accountData.map(accData => {
        if (accData.id === tran.accountId) {
          return updatedAccount;
        } else {
          return accData;
        }
      })
      setAccountData(updatedAccountList)
    })
  }

  function patchPlus(tran, newBalance){
    fetch(`http://localhost:4000/Account/${tran.accountId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalance})
    })
    .then(resp => resp.json())
    .then(updatedAccount => {
      const updatedAccountLists = accountData.map(accData => {
        if (accData.id === tran.accountId) {
          return updatedAccount;
        } else {
          return accData
        }
      })
      setAccountData(updatedAccountLists)
    })
  }
  
  return (
    <div>
      {accountData.map(details => {
        return (
          <AccountBalance key={details.id} balance={details.balance} accountNumber={details.accountNumber} accountType={details.accountType} setAccountId={setAccountId} id={details.id} accountId={accountId}/>
        )
      })}
      <StatementContainer postTransaction={postTransaction} transactionData={transactionData} accountId={accountId} setTransactionData={setTransactionData} patchMinus={patchMinus} patchPlus={patchPlus} accountData={accountData}/>
    </div>
  );
}

export default App;
