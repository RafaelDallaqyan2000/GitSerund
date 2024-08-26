export const getParsedDate = (date) => {
  let strSplitDate = String(date).split(" ");
  let date1 = new Date(strSplitDate[0]);
  let dd = date1.getDate();
  let mm = date1.getMonth() + 1;

  let yyyy = date1.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date1 = dd + "-" + mm + "-" + yyyy;
  return date1;
};
