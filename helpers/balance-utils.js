export const calculateBalance = (startingBalance, transactions, cleared) => {
  if (cleared) {
    const clearedTransactions = transactions.filter((transaction) => transaction.cleared);

    let clearedBalance = startingBalance;

    clearedTransactions.forEach((transaction) => (clearedBalance += transaction.amount));

    return clearedBalance.toFixed(2);
  }

  let accountBalance = startingBalance;

  transactions.forEach((transaction) => (accountBalance += transaction.amount));

  return accountBalance.toFixed(2);
};
