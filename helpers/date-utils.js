export const formatDate = (dateObject) => {
  const year = dateObject.getFullYear();

  let month = dateObject.getMonth() + 1;

  if (month <= 9) {
    month = `0${month}`;
  }

  let day = dateObject.getDate();

  if (day <= 9) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};
