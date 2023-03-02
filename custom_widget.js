




////////////////////Header Information/////////////////
//todays Date
let today = new Date()
var todayYear = today.getFullYear()
var todayMonth = today.getMonth() + 1




//Mutable Year Variable
var curYear = todayYear
document.querySelector('.headerYear').innerText = curYear


//Past Years Object & Array
let yearObj = {}
let lastTwoYearsArr = []

for(let i=curYear; i>=(curYear-2); i--){
    lastTwoYearsArr.push(i)
}

for(let i=0; i<lastTwoYearsArr.length; i++){
    if(yearObj[i] != lastTwoYearsArr[i]){
        yearObj[i] = lastTwoYearsArr[i]
    }
}

let monthObj = {
    1 : "January",
    2 : "February",
    3 : "March",
    4 : "April",
    5 : "May",
    6 : "June",
    7 : "July",
    8 : "August",
    9 : "September",
    10 : "October",
    11 : "November",
    12 : "December"
}


//Mutable Month Variable
let curMonth = todayMonth

document.querySelector('.headerMonth').innerText = monthObj[curMonth]



//////////////////////////////////////backArrow/////////////////////
//disable after 2 years
let lastYr = curYear - 2

function backArrow(){
    document.querySelector('.forwardArrow').disabled = false
    
    curMonth = curMonth - 1

    if((curMonth == 1) && (curYear == lastYr)){
        document.querySelector('.backArrow').disabled = true
    }else if(curMonth == 0){
        curMonth = 12
        curYear = curYear - 1
    }
    document.querySelector('.headerMonth').innerText = monthObj[curMonth]
    document.querySelector('.headerYear').innerText = curYear
}


/////////////////////////////////forwardArrow//////////////////
function forwardArrow(){
    document.querySelector('.backArrow').disabled = false
    
    curMonth = curMonth + 1

    if((curMonth == todayMonth) && (curYear == yearObj[0])){
        document.querySelector('.forwardArrow').disabled = true
    }else if (curMonth == 13){
        curMonth = 1
        curYear = curYear + 1
    }
    document.querySelector('.headerMonth').innerText = monthObj[curMonth]
    document.querySelector('.headerYear').innerText = curYear
   
}

/////////////////////////////Selected Date///////////////
document.querySelector('.selectedYear').innerText = curYear
document.querySelector('.selectedMonth').innerText = monthObj[curMonth]

function refreshDate(){
    document.querySelector('.selectedYear').innerText = curYear
    console.log(curYear)
    document.querySelector('.selectedMonth').innerText = monthObj[curMonth]
    console.log(monthObj[curMonth])
}


/////////////////////////////Selected Today Button////////////////
function selectedToday(){
    location.reload();
}















//////////////////////////////////Days in Month/////////////////////////


let daysInMonthObj = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31,
}

//account for leap year


let daysOfWeekObj = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday",
}


function datesOnCalender(){

//strMonth
    let strMonth = `${curMonth}`
    if(curMonth.toString().length == 1){
        strMonth = `0${curMonth}`
    }
    
//finding the dates and starting on the correct one    
    let findDateObj = new Date(`${curYear}-${strMonth}-01T00:00:00.000`)
    let numDayOfWeek = findDateObj.getDay()
    let theMond = findDateObj.getMonth()
    
    //month name
    const date = new Date();
    date.setMonth(theMond);
    var abc = date.toLocaleString('en-US', { month: 'long' })
  

        let dayGrid = document.querySelector('.dayGrid')  




        // if dayGrid has child


    for(let i=1; i<=daysInMonthObj[abc] + numDayOfWeek; i++){
    
    
        if(i <= numDayOfWeek){
            const newLi = document.createElement("button")
            newLi.setAttribute('class', 'buTTons')
            dayGrid.appendChild(newLi)
    
        }else{
            const newLi = document.createElement("button")
            const newContent = document.createTextNode(i-numDayOfWeek)
            newLi.setAttribute('class', 'buTTons')
            newLi.appendChild(newContent);
            dayGrid.appendChild(newLi)
        }
    }
    

}

datesOnCalender()


















//////////////////////////////////Data Str ///////////////////////
var dataStr = ''

function getStr(){
    if(curMonth.toString().length == 1){
        dataStr = `${curYear}-0${curMonth}-DD`
    }else{
        dataStr = `${curYear}-${curMonth}-DD`
    }
    console.log(dataStr)
}

