export const DateConvert = () => {
  // use a method
  const getYesterday = (dateOnly = false) => {
    let d = new Date();
    d.setDate(d.getDate() - 2);

    const convertDate = new Date(d.toDateString()).toLocaleDateString();
    return dateOnly ? convertDate : d;
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return { getYesterday, formatDate }
}
