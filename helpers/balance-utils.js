import { DateTime } from 'luxon';

export const calculateBalance = (startingBalance, transactions, type) => {
  if (type === 'cleared') {
    const clearedTransactions = transactions.filter((transaction) => transaction.cleared);

    return clearedTransactions.reduce((a, b) => a + b.amount, startingBalance).toFixed(2);
  } else if (type === 'budget') {
    const budgetTransactions = transactions.filter((transaction) => {
      const transactionDate = DateTime.fromISO(transaction.date);
      const currentDate = DateTime.now().startOf('day');
      const startDate = currentDate.startOf('month');
      const endDate = currentDate.endOf('month');

      return transaction.budget && transactionDate >= startDate && transactionDate <= endDate;
    });

    return budgetTransactions.reduce((a, b) => a + b.amount, 2000).toFixed(2);
  } else {
    return transactions.reduce((a, b) => a + b.amount, startingBalance).toFixed(2);
  }
};
