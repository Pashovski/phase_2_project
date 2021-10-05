import { useState, useEffect } from "react";
import AccountBalance from "./AccountBalance";
import StatementContainer from "./StatementContainer";
// import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  const [accountData, setAccountData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/Account?_embed=transactions')
    .then(resp => resp.json())
    .then(data => setAccountData(data))
  },[])
  function postTransaction(money){
    fetch('http://localhost:3000/Account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(money)
    })
    .then(resp => resp.json())
    .then(data => {
      setAccountData([data, ...accountData])
    })
  }
  
  return (
    <div>
      {accountData.map(details => {
        return (
          <AccountBalance key={details.id} balance={details.balance} accountNumber={details.accountNumber} accountType={details.accountType}/>
        )
      })}
      <StatementContainer postTransaction={postTransaction} accountData={accountData}/>
    </div>
  );
}

export default App;
