const helper = {
  formatDate(date, format = 'YYYY-MM-DD', includeTime = false) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    let hour, minute, second;

    if (includeTime) {
      hour = String(date.getHours()).padStart(2, '0');
      minute = String(date.getMinutes()).padStart(2, '0');
      second = String(date.getSeconds()).padStart(2, '0');
    }

    let formattedDate = format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);

    if (includeTime) {
      formattedDate = formattedDate
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second);
    }
    return formattedDate;
  },
  
}

export default helper