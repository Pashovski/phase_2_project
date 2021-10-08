import { useState, useEffect } from "react";
import AccountBalance from "./AccountBalance";
import StatementContainer from "./StatementContainer";
import TransferForm from "./TransferForm";
import {Switch, Route, useHistory, Link} from 'react-router-dom'
import About from "./About";
import Header from "./Header";
import LoginForm from "./LoginForm";


function App() {
  const [accountData, setAccountData] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [accountId, setAccountId] = useState(1)
  const [otherAccountId, setOtherAccountId] = useState(2)
  const [accountDataCopy, setAccountDataCopy] = useState({
    "balance": 0,
    "accountNumber": 0,
    "accountType": ""
  })
  const userLogin ={
    email: "charlieG@flatiron.com",
    password: "password"
  }

  const history = useHistory()
  const [user, setUser] = useState({name: "", email:""})
  const [errorMessage, setErrorMessage] = useState(false)

  const Login = details => {
    console.log(details)
    if (details.email == userLogin.email && details.password == userLogin.password){
      console.log("Logged in")
      history.push('/home')
      setErrorMessage(false)
    } else {
      console.log("details do not match")
      setErrorMessage(true)
    }
  }

  const Logout = () => {
    setUser({ name: "", email: ""})
  }

  useEffect(() => {
    fetch('http://localhost:4000/Account')
    .then(resp => resp.json())
    .then(data => setAccountData(data))
  },[])


  useEffect(() => {
    fetch('http://localhost:4000/transactions')
    .then(resp => resp.json())
    .then(data => setTransactionData(data))
  }, [])

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
    fetch(`http://localhost:4000/Account/${tran}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalance})
    })
    .then(resp => resp.json())
    .then(updatedAccount => {
      const updatedAccountList = accountData.map(accData => {
        if (accData.id === tran) {
          return updatedAccount;
        } else {
          return accData;
        }
      })
      setAccountData(updatedAccountList)
      fetch('http://localhost:4000/Account')
      .then(resp => resp.json())
      .then(data => setAccountData(data))
    })
  }

  function patchPlus(tran, newBalance){
    fetch(`http://localhost:4000/Account/${tran}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalance})
    })
    .then(resp => resp.json())
    .then(updatedAccount => {
      const updatedAccountLists = accountData.map(accData => {
        if (accData.id === tran) {
          return updatedAccount;
        } else {
          return accData
        }
      })
      setAccountDataCopy([updatedAccountLists])
      fetch('http://localhost:4000/Account')
      .then(resp => resp.json())
      .then(data => setAccountData(data))
    })
  }

  function patchOutgoingBalance(id, newBalance, idTwo, newBalanceTwo){
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
      updatedOutgoingTransfer.pop()
      console.log(updatedOutgoingTransfer)
      setAccountDataCopy([updatedOutgoingTransfer])
      console.log(accountDataCopy)
    })
    fetch(`http://localhost:4000/Account/${idTwo}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({balance: newBalanceTwo})
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
      const splicedArray = updatedInboundTransfer.shift()
      console.log(splicedArray)
      setAccountData([accountDataCopy, splicedArray])
      console.log(accountData)
      fetch('http://localhost:4000/Account')
      .then(resp => resp.json())
      .then(data => setAccountData(data))
    })
  }

  // function patchInboundBalance(id, newBalance){
  //   fetch(`http://localhost:4000/Account/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({balance: newBalance})
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     const updatedInboundTransfer = accountData.map(accData => {
  //       if (accData.id === id) {
  //         return data;
  //       } else {
  //         return accData;
  //       }
  //     })
  //     const splicedArray = updatedInboundTransfer.shift()
  //     console.log(splicedArray)
  //     setAccountData([...accountDataCopy, splicedArray])
  //     console.log(accountData)
  //   })
  // }


  
  // setAccountData(accountData.splice(2, 1))
  console.log(accountData)
  return (
    <div>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <LoginForm Login={Login} errorMessage={errorMessage} />
          </Route>
          <Route path='/about'>
            <About/>
          </Route>
          <Route exact path='/home'>
            <Link to='/'>
                <button onClick={() => Logout()}>Logout</button>
            </Link>
            {accountData.map(details => {
              return (
                <AccountBalance key={details.id} balance={details.balance} accountNumber={details.accountNumber} accountType={details.accountType} setAccountId={setAccountId} id={details.id} accountId={accountId}/>
              )
            })}
            <TransferForm setOtherAccountId={setOtherAccountId} otherAccountId={otherAccountId} accountId={accountId} patchOutgoingBalance={patchOutgoingBalance} accountData={accountData}/>
            <StatementContainer postTransaction={postTransaction} transactionData={transactionData} accountId={accountId} setTransactionData={setTransactionData} patchMinus={patchMinus} patchPlus={patchPlus} accountData={accountData}/>
          </Route>
        </Switch>
    </div>
  );
}



export default App;
