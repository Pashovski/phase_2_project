import { useState, useEffect } from "react";
import AccountBalance from "./AccountBalance";
import StatementContainer from "./StatementContainer";

function App() {
  const [accountData, setAccountData] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/Account')
    .then(resp => resp.json())
    .then(data => setAccountData(data))
  },[])

  console.log(accountData)
  return (
    <div>
      {accountData.map(details => {
        return (
          <AccountBalance key={details.id} balance={details.balance} accountNumber={details.accountNumber} accountType={details.accountType}/>
        )
      })}
      <StatementContainer accountData={accountData}/>
    </div>
  );
}

export default App;
