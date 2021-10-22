setInterval(() => {
    let currentTime=new Date();
    let currentHour=currentTime.getHours();
    let currentMinutes=currentTime.getMinutes();
    let currentSeconds=currentTime.getSeconds();

    //Pad '0' if minute or second is less than 10(Single digit)
    currentMinutes=(currentMinutes<10?"0":"")+currentMinutes;
    currentSeconds=(currentSeconds<10?"0":"")+currentSeconds;

    //Convert 24hr format into 12hr
    let timeOfDay=(currentHour<12)?"AM":"PM";
    currentHour=(currentHour>12)?currentHour-12:currentHour;
    currentHour=(currentHour==0)?12:currentHour;
    
    let currentTimeString=currentHour+":"+currentMinutes+":"+currentSeconds+" "+timeOfDay;

    //Insert clock in DOM
    document.getElementById('clock').innerHTML=currentTimeString;

}, 1000);