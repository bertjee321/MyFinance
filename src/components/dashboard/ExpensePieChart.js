import React, { useLayoutEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import AccountFilter from "../filters/AccountFilter";
import YearFilter from "../filters/YearFilter";

import "./css/main-modules.css";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{fontSize: '12.5px'}}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpensePieChart = (props) => {
  const [width, height] = useWindowSize();
  const [filteredYear, setFilteredYear] = useState(
    new Date().getFullYear().toString()
  );
  const [filteredAccount, setFilteredAccount] = useState("All");
  const { expenses } = props;

  const yearList = [
    ...new Set(
      expenses.map((expense) => expense.date.getFullYear().toString())
    ),
  ];

  const filterYearChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filterAccountChangeHandler = (selectedAccount) => {
    setFilteredAccount(selectedAccount);
  };

  let filteredExpenses;
  if (filteredAccount !== "All") {
    filteredExpenses = expenses.filter((expense) => {
      return (
        expense.date.getFullYear().toString() === filteredYear &&
        expense.account === filteredAccount
      );
    });
  } else {
    filteredExpenses = expenses.filter((expense) => {
      return expense.date.getFullYear().toString() === filteredYear;
    });
  }

  const chartDataPoints = [
    { name: "Housing", value: 0 },
    { name: "Transportation", value: 0 },
    { name: "Food", value: 0 },
    { name: "Utilities", value: 0 },
    { name: "Insurance", value: 0 },
    { name: "Medical", value: 0 },
    { name: "Savings/Investing or Debt Payment", value: 0 },
    { name: "Lifestyle", value: 0 },
    { name: "Recreation", value: 0 },
    { name: "Miscellaneous", value: 0 },
  ];

  const COLORS = [
    "red",
    "green",
    "YellowGreen",
    "blue",
    "orange",
    "DarkGoldenRod",
    "SteelBlue",
    "brown",
    "grey",
    "lightsalmon",
  ];

  for (const expense in filteredExpenses) {
    const expenseCategory = filteredExpenses[expense].category;
    for (const key in chartDataPoints) {
      if (chartDataPoints[key].name === expenseCategory) {
        chartDataPoints[key].value += filteredExpenses[expense].amount;
      }
    }
  }

  return (
    <React.Fragment>
      <div className="filter">
        <AccountFilter
          selectedAccount={filteredAccount}
          onChangeFilter={filterAccountChangeHandler}
        />
        <YearFilter
          yearList={yearList}
          selectedYear={filteredYear}
          onChangeFilter={filterYearChangeHandler}
        />
      </div>
      <PieChart width={width < 400 ? 300 : 350} height={450}>
        <Pie
          data={chartDataPoints}
          cx={width < 400 ? 150 : 170}
          cy={150}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={width < 400 ? 100 : 125}
          fill="#8884d8"
          dataKey="value"
        >
          {chartDataPoints.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </React.Fragment>
  );
};

export default ExpensePieChart;
