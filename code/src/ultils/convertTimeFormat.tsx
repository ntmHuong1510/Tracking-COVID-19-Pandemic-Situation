export const formatDate = (dateString: string) => {
  const dateParts = dateString.split("/");
  const year = parseInt(dateParts[2]) + 2000; // add 2000 to convert from yy to yyyy
  const month = parseInt(dateParts[0]) - 1; // subtract 1 to convert from 1-indexed to 0-indexed
  const day = parseInt(dateParts[1]);
  const dateObject = new Date(year, month, day);
  const formattedDate = dateObject.toISOString().slice(0, 10);

  return formattedDate;
};
