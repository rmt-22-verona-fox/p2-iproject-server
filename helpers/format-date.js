function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        seconds = d.getSeconds(),
        minutes = d.getMinutes(),
        hour = d.getHours()
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return `${year}${month}${day}${hour}${minutes}${seconds}`;
}

module.exports = formatDate