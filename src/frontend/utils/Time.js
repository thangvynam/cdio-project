export function getCurrTime() {
    let timestamp = new Date().getTime();
    return parseInt(timestamp);
}

export function convertTime(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleString();
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}