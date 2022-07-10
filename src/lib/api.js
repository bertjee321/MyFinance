const FIREBASE_DOMAIN =
  "https://crueder-12979-default-rtdb.europe-west1.firebasedatabase.app";

export async function getAllTransactions() {
  const response = await fetch(`${FIREBASE_DOMAIN}/financials.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch transactions");
  }

  const incomeList = [];
  const expenseList = [];

  for (const key in data.incomes) {
    const incomeObj = {
      id: key,
      ...data.incomes[key],
      amount: parseFloat(data.incomes[key].amount),
      date: new Date(data.incomes[key].date),
    };

    incomeList.push(incomeObj);
  }

  for (const key in data.expenses) {
    const expenseObj = {
      id: key,
      ...data.expenses[key],
      amount: parseFloat(data.expenses[key].amount),
      date: new Date(data.expenses[key].date),
    };

    expenseList.push(expenseObj);
  }

  return { incomeList, expenseList };
}

export async function addExpense(expenseData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/financials/expenses.json`, {
    method: "POST",
    body: JSON.stringify(expenseData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return null;
}

export async function getAllExpenses() {
  const response = await fetch(`${FIREBASE_DOMAIN}/financials/expenses.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch expenses.");
  }

  const transformedExpenses = [];

  for (const key in data) {
    const expenseObj = {
      id: key,
      ...data[key],
      amount: parseFloat(data[key].amount),
      date: new Date(data[key].date),
    };

    transformedExpenses.push(expenseObj);
  }

  return transformedExpenses;
}

export async function getSingleExpense(expenseId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/financials/expenses/${expenseId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch expense details.");
  }

  const loadedData = {
    ...data,
    amount: parseFloat(data.amount),
    date: new Date(data.date),
  };

  return loadedData;
}

export async function addIncome(incomeData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/financials/incomes.json`, {
    method: "POST",
    body: JSON.stringify(incomeData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return null;
}

export async function getAllIncomes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/financials/incomes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch incomes.");
  }

  const transformedIncomes = [];

  for (const key in data) {
    const incomeObj = {
      id: key,
      ...data[key],
      amount: parseFloat(data[key].amount),
      date: new Date(data[key].date),
    };

    transformedIncomes.push(incomeObj);
  }

  return transformedIncomes;
}

export async function getSingleIncome(incomeId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/financials/incomes/${incomeId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch income details.");
  }

  const loadedData = {
    ...data,
    amount: parseFloat(data.amount),
    date: new Date(data.date),
  };

  return loadedData;
}

export async function getAccounts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/accounts.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch account details.");
  }

  const transformedData = [];

  for (const key in data) {
    transformedData.push(data[key]);
  }

  return transformedData;
}
