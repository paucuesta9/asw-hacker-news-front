export function getTimeSince(sinceTimeString) {
    let msNow = new Date().getTime();
    let msSince = new Date(sinceTimeString).getTime();
    let msElapsed = msNow - msSince;
    let daysElapsed = parseInt(msElapsed / (1000*60*60*24));
    if(daysElapsed > 0) return daysElapsed + " day"+ (daysElapsed!=1 ? "s" : "") +" ago";
    let hoursElapsed = parseInt(msElapsed / (1000*60*60));
    if(hoursElapsed > 0) return hoursElapsed + " hour"+ (hoursElapsed!=1 ? "s" : "") +" ago";
    let minElapsed = parseInt(msElapsed / (1000*60));
    if(minElapsed > 0) return minElapsed + " minute"+ (minElapsed!=1 ? "s" : "") +" ago";
}