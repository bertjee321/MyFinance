const FIREBASE_DOMAIN =
  "https://crueder-12979-default-rtdb.europe-west1.firebasedatabase.app";

export async function getAllTransactions({ token }) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/financials.json/?auth=${token}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch transactions.");
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

export async function addTransaction({ requestData, type, token }) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/financials/${type}.json?auth=${token}`,
    {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return null;
}

export async function getSingleExpense({ id, token }) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/financials/expenses/${id}.json?auth=${token}`
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

export async function getSingleIncome({ id, token }) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/financials/incomes/${id}.json?auth=${token}`
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

export async function getAccounts({ token }) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/accounts.json?auth=${token}`
  );
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

export async function editAccounts() {
  //LOGIC FOR ADDING, REMOVING OR CHANGING (BANK) ACCOUNTS
}

export async function getCategories({ type, token }) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/categories/${type}.json?auth=${token}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch details.");
  }

  const transformedData = [];

  for (const key in data) {
    transformedData.push(data[key]);
  }

  return transformedData;
}

export async function editCategories() {
  //LOGIC FOR ADDING, REMOVING OR CHANGING EXPENSE/INCOME CATEGORIES
}
