import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import IncomeDetails from "./pages/IncomeDetails";
import ExpenseDetails from "./pages/ExpenseDetails";
import NewIncome from "./components/incomes/NewIncome";
import NewExpense from "./components/expenses/NewExpense";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='MyFinance' element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="incomes" element={<Incomes />}>
          <Route
            path=""
            element={
              <div style={{ marginBottom: "1rem" }}>
                <Link className="btn" to={"new-income"}>
                  Add Income
                </Link>
              </div>
            }
          />
          <Route path={"new-income"} element={<NewIncome />} />
        </Route>
        <Route path="incomes/:incomeId" element={<IncomeDetails />} />
        <Route path="expenses" element={<Expenses />}>
          <Route
            path=""
            element={
              <div style={{ marginBottom: "1rem" }}>
                <Link className="btn" to={"new-expense"}>
                  Add Expense
                </Link>
              </div>
            }
          />
          <Route path={"new-expense"} element={<NewExpense />} />
        </Route>
        <Route path="expenses/:expenseId" element={<ExpenseDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
