export function getCurrTime() {
    let timestamp = new Date().getTime();
    return timestamp
}

export function convertTime(timestamp) {

    let date = new Date(timestamp);
    return date.toLocaleString();
    
}