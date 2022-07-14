import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import IncomeDetails from "./pages/IncomeDetails";
import ExpenseDetails from "./pages/ExpenseDetails";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";
import NewTransaction from "./components/transactions/NewTransaction";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="incomes" element={<Transactions type="Incomes" />}>
          <Route
            path=""
            element={
              <div style={{ marginBottom: "1rem" }}>
                <Link className="button" to={"new-income"}>
                  Add Income
                </Link>
              </div>
            }
          />
          <Route
            path={"new-income"}
            element={<NewTransaction type="Incomes" />}
          />
        </Route>
        <Route path="incomes/:incomeId" element={<IncomeDetails />} />
        <Route path="expenses" element={<Transactions type="Expenses" />}>
          <Route
            path=""
            element={
              <div style={{ marginBottom: "1rem" }}>
                <Link className="button" to={"new-expense"}>
                  Add Expense
                </Link>
              </div>
            }
          />
          <Route
            path={"new-expense"}
            element={<NewTransaction type="Expenses" />}
          />
        </Route>
        <Route path="expenses/:expenseId" element={<ExpenseDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
