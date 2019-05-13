export function getLevel(keyRow) {
    let level = keyRow.split('-');
    return level.filter(element => element !== '').length;
}

export function getPos(keyRow, pos) {
    let level = keyRow.split('-');
    if(level.length !== 0) {
        return level[pos];
    }

    return -1;
}
