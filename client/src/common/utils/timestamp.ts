// Pass UTC Time
export default (ts) => {
    let d = new Date(ts);
    if (isNaN(d.valueOf())) return '';
    let todayUTC = new Date();
    todayUTC.setHours(0, 0, 0, 0);
    let diff = Math.floor((todayUTC.valueOf() - d.valueOf()) / 86400000);
    let dstrs = d.toString().split(' ');
    let hours = dstrs[4].split(':');
    if (diff < 0) {
        let timeZ = 'AM';
        if (Number(hours[0]) > 12) {
            timeZ = 'PM'
            hours[0] = (Number(hours[0]) - 12).toString();
        }
        return `${hours[0]}:${hours[1]} ${timeZ}`
    }

    if (diff < 365) {
        return `${dstrs[2]} ${dstrs[1]}`
    }
    return `${dstrs[1]} ${dstrs[2]}`
}