import { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import IncomeDetails from "./pages/IncomeDetails";
import ExpenseDetails from "./pages/ExpenseDetails";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";
import NewTransaction from "./components/transactions/NewTransaction";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardSettings from "./components/user-settings/DashboardSettings";
import InvestmentSettings from "./components/user-settings/InvestmentSettings";
import AccountSettings from "./components/user-settings/AccountSettings";
import TransactionCategoriesSettings from "./components/user-settings/TransactionCategoriesSettings";

import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />

        <Route path="settings" element={<SettingsPage />}>
          <Route path="dashboard-settings" element={<DashboardSettings />} />
          <Route path="investment-settings" element={<InvestmentSettings />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route
            path="category-settings"
            element={<TransactionCategoriesSettings />}
          />
        </Route>

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="incomes" element={<Transactions type="Incomes" />}>
          {authCtx.isLoggedIn && (
            <Route
              path=""
              element={
                <div style={{ margin: "1rem 0" }}>
                  <Link className="button" to={"new-income"}>
                    Add Income
                  </Link>
                </div>
              }
            />
          )}
          <Route
            path={"new-income"}
            element={<NewTransaction type="Incomes" />}
          />
        </Route>
        <Route path="incomes/:incomeId" element={<IncomeDetails />} />
        <Route path="expenses" element={<Transactions type="Expenses" />}>
          {authCtx.isLoggedIn && (
            <Route
              path=""
              element={
                <div style={{ margin: "1rem 0" }}>
                  <Link className="button" to={"new-expense"}>
                    Add Expense
                  </Link>
                </div>
              }
            />
          )}
          <Route
            path={"new-expense"}
            element={<NewTransaction type="Expenses" />}
          />
        </Route>
        <Route path="expenses/:expenseId" element={<ExpenseDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
