function _toMonth(number, type = 'f'){
    let months = {
        f: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        s: ["Jan.", "Feb. ", "Mar.", "Apr.", "May ", "June", "July", "Aug.", "Sept.", "Oct. ", "Nov.", "Dec."]
    }
    number = Number(number)
    return ((number > 0)  && number < 13) ? months[type][number-1] : false;
}

function _toDate(number){
    if(number > 0 && number < 31){
        switch(number){
            case 1:
                return number + "st";
            case 2: 
                return number + "nd";
            case 3:
                return number + "rd";
            default:
                return number + "th";
        }
    }else
        return false
        
}

module.exports = {
    toMonth : _toMonth,
    toDate : _toDate
} 