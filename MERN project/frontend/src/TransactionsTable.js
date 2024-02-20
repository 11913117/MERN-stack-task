import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage, searchText]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchText}`);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchTransactions();
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <label htmlFor="month">Select Month:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        {/* Options for months */}
      </select>
      <input type="text" value={searchText} onChange={handleSearchChange} />
      <button onClick={handleSearchSubmit}>Search</button>
      <table>
        {/* Table headers and rows for transactions */}
      </table>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
