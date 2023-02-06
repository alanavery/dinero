export const calculateBalance = (transactions, cleared) => {
  if (cleared) {
    const clearedTransactions = transactions.filter((transaction) => transaction.cleared);

    let clearedBalance = 0;

    clearedTransactions.forEach((transaction) => (clearedBalance += transaction.amount));

    return clearedBalance.toFixed(2);
  }

  let accountBalance = 0;

  transactions.forEach((transaction) => (accountBalance += transaction.amount));

  return accountBalance.toFixed(2);
};
