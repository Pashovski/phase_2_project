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
  return (
    <div>
      <AccountBalance/>
      <StatementContainer/>
    </div>
  );
}

export default App;
