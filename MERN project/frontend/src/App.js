import React from 'react';
import './App.css';
import TransactionsTable from './TransactionsTable';
import TransactionStatistics from './TransactionStatistics';
import TransactionsBarChart from './TransactionsBarChart';

function App() {
  return (
    <div className="App">
      <TransactionsTable />
      <TransactionStatistics />
      {/* <TransactionsBarChart /> */}
    </div>
  );
}

export default App;
