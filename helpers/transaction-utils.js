import { DateTime } from 'luxon';

export const calculateBalance = (startingBalance, transactions, type) => {
  if (type === 'cleared') {
    const clearedTransactions = transactions.filter((transaction) => transaction.cleared);

    return clearedTransactions.reduce((a, b) => a + b.amount, startingBalance).toFixed(2);
  }

  if (type === 'budget') {
    const budgetTransactions = transactions.filter((transaction) => {
      const transactionDate = DateTime.fromISO(transaction.date);
      const currentDate = DateTime.now().startOf('day');
      const startDate = currentDate.startOf('month');
      const endDate = currentDate.endOf('month');

      return transaction.budget && transactionDate >= startDate && transactionDate <= endDate;
    });

    return budgetTransactions
      .reduce((a, b) => {
        if (b.split) {
          return a + b.amount / 2;
        }

        return a + b.amount;
      }, 2000)
      .toFixed(2);
  }

  return transactions.reduce((a, b) => a + b.amount, startingBalance).toFixed(2);
};

export const groupTransactionsByDate = (transactions) => {
  const groups = [];

  for (const transaction of transactions) {
    const matchingGroup = groups.find((group) => group.date === transaction.date);

    if (matchingGroup) {
      matchingGroup.transactions.push(transaction);
    } else {
      groups.push({
        date: transaction.date,
        transactions: [transaction],
      });
    }
  }

  return groups.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const containsPendingTransactions = (group) => {
  return group.transactions.find((transaction) => !transaction.cleared);
};
