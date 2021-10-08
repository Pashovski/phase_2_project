import { useState, useEffect } from "react";
import AccountBalance from "./AccountBalance";
import StatementContainer from "./StatementContainer";
import TransferForm from "./TransferForm";
import {Switch, Route} from 'react-router-dom'
import About from "./About";
import Header from "./Header";

function App() {
  const [accountData, setAccountData] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [accountId, setAccountId] = useState(1)
  const [otherAccountId, setOtherAccountId] = useState(2)
  const [balanceAccount, setBalanceAccount] = useState()
  const [balanceOtherAccount, setBalanceOtherAccount] = useState()

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

  function patchOutgoingBalance(id, newBalance){
    fetch(`http://localhost:4000/Account/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalance})
    })
    .then(resp => resp.json())
    .then(data => {
      const updatedOutgoingTransfer = accountData.map(accData => {
        if (accData.id === id) {
          return data;
        } else {
          return accData;
        }
      })
      setAccountData(updatedOutgoingTransfer)
    })
  }

  function patchInboundBalance(id, newBalance){
    fetch(`http://localhost:4000/Account/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalance})
    })
    .then(resp => resp.json())
    .then(data => {
      const updatedInboundTransfer = accountData.map(accData => {
        if (accData.id === id) {
          return data;
        } else {
          return accData;
        }
      })
      setAccountData(updatedInboundTransfer)
    })
  }
  
  return (
    <div>
        <Header/>
        <Switch>
          <Route path='/about'>
            <About/>
          </Route>
          <Route exact path='/'>
            {accountData.map(details => {
              return (
                <AccountBalance key={details.id} balance={details.balance} accountNumber={details.accountNumber} accountType={details.accountType} setAccountId={setAccountId} id={details.id} accountId={accountId}/>
              )
            })}
            {accountData.filter(account => account.id === accountId).map(details => {
                return(
                  <TransferForm details={details} setOtherAccountId={setOtherAccountId} otherAccountId={otherAccountId} accountId={accountId} patchOutgoingBalance={patchOutgoingBalance} accountData={accountData} patchInboundBalance={patchInboundBalance}/>
                      )
              })}
            <StatementContainer postTransaction={postTransaction} transactionData={transactionData} accountId={accountId} setTransactionData={setTransactionData} patchMinus={patchMinus} patchPlus={patchPlus} accountData={accountData}/>
          </Route>
        </Switch>
    </div>
  );
}



export default App;
