import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TransactionsBarChart = () => {
  const [chartData, setChartData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('March');

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`/api/bar-chart?month=${selectedMonth}`);
      const data = response.data.map(item => ({
        label: item.range,
        data: [item.count],
      }));
      setChartData({
        labels: data.map(item => item.label),
        datasets: [
          {
            label: 'Number of Items',
            data: data.map(item => item.data[0]),
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <label htmlFor="month">Select Month:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        {/* Options for months */}
      </select>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionsBarChart;
