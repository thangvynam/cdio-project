export function getLevel(keyRow) {
    let level = keyRow.split('-');
    return level.filter(element => element !== '').length;
}