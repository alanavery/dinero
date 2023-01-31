export const formatDate = (dateObject) => {
  const year = dateObject.getFullYear();

  let month = dateObject.getMonth() + 1;

  if (month <= 9) {
    month = '0' + month;
  }

  let date = dateObject.getDate();

  if (date <= 9) {
    date = '0' + month;
  }

  return `${year}-${month}-${date}`;
};
