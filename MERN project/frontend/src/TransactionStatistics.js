import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('March');

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`/api/statistics?month=${selectedMonth}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transaction Statistics</h2>
      <label htmlFor="month">Select Month:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        {/* Options for months */}
      </select>
      <div>
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
