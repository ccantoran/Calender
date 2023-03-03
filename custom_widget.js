////////////////////Header Information///////////////////////////////////
//todays Date
let today = new Date()
var todayYear = today.getFullYear()
var todayMonth = today.getMonth() + 1
var todaysDate = today.getDate()
let curDay = todaysDate


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
document.querySelector('.selectedDay').innerText = curDay


function refreshDate(){
    document.querySelector('.selectedYear').innerText = curYear
    document.querySelector('.selectedMonth').innerText = monthObj[curMonth]
}


/////////////////////////////Selected Today Button////////////////
function selectedToday(){
    location.reload();
}

//////////////////////////////////Populating Calender w/ Days /////////////////////////

let daysInMonthObj = {
    "January": 31,
    "February": {true: 29, false:28},
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
let dayGrid = document.querySelector('.dayGrid')  

// Delete the days if the calender is already populated 
let element = document.getElementById("dayGrid");
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }


//formating number of Month to fit string and have length of 2
let strMonth = curMonth.toString().length == 1 ? `0${curMonth}` : curMonth
//what day of the week did the 1st of the month fall on    
let findDateObj = new Date(`${curYear}-${strMonth}-01T00:00:00.000`)
let numDayOfWeek = findDateObj.getDay()

//Num of month to Full string
let numMonth = findDateObj.getMonth()
const mutToday = new Date();
mutToday.setMonth(numMonth);
var fullMonthStr = mutToday.toLocaleString('en-US', { month: 'long' })
    

//is the curYear in leap year?
let leapOrNoLeap = curYear % 4 == 0 ? true : false

//If Feb is curMonth then true or false to find out # of days for total Month 
let totalDaysInMonth = daysInMonthObj[fullMonthStr]
if (fullMonthStr == "February" && leapOrNoLeap == true){
    totalDaysInMonth = daysInMonthObj.February.true
}else if(fullMonthStr == "February" && leapOrNoLeap == false){
    totalDaysInMonth = daysInMonthObj.February.false
}


    for(let i=1; i<=totalDaysInMonth + numDayOfWeek; i++){
        if(i <= numDayOfWeek){
            const childButtons = document.createElement("button")
            childButtons.setAttribute('class', 'childButtons')
            childButtons.setAttribute('disabled', true)
            dayGrid.appendChild(childButtons)
        }else{
            const childButtons = document.createElement("button")
            const newContent = document.createTextNode(i-numDayOfWeek)
            childButtons.setAttribute('class', 'childButtons')
            childButtons.appendChild(newContent);
            dayGrid.appendChild(childButtons)

            childButtons.onclick = function(){
                curDay = i - numDayOfWeek
                document.querySelector('.selectedDay').innerText = curDay
                getStr()
            }
        }
    }
}

datesOnCalender()

//////////////////////////////////Data Str ///////////////////////

function getStr(){
let dataMonth = curMonth.toString().length == 1 ? `0${curMonth}` : curMonth
var dataStr = ''

    if(curDay.toString().length == 1){
        dataStr = `${curYear}-${dataMonth}-0${curDay}`
    }else{
        dataStr = `${curYear}-${dataMonth}-${curDay}`
    }
    console.log(dataStr)
}

getStr()


////////////////////////////////////////////////////////////////////////////////////Clock//////////////////////////////////////////////////

//AM PM toggle
function dayChange(){
    var checkBox = document.getElementById('checkbox')
    if(checkBox.checked){
       document.getElementById('userAmPm').innerText = 'PM'
    }else{
       document.getElementById('userAmPm').innerText = 'AM'
    }
}


//User Hour
function getTimeHour(hr){
    if(hr.toString().length == 1){
        document.getElementById('userHour').innerText = `0${hr}`
    }else{
        document.getElementById('userHour').innerText = `${hr}`
    }

    //Min clock appears 
    document.querySelector('.clockMin').style.display = "flex"
    document.querySelector('.test1').style.display = "none"
}

//User Minute 
function getTimeMin(min){
    if(min.toString().length == 1){
        document.getElementById('userMin').innerText = `0${min}`
    }else{
        document.getElementById('userMin').innerText = `${min}`
    }

    //Hour Clock appears
    document.querySelector('.test1').style.display = "flex"
    document.querySelector('.clockMin').style.display = "none"
}


//Data Str 
function timeStr(){
    let strHr = document.getElementById('userHour').innerText 
    let strMin = document.getElementById('userMin').innerText
    var amOrPm = document.getElementById('userAmPm').innerText
    
    if(amOrPm.includes('PM')){
        strHr = parseInt(strHr) + 12
    }

    console.log(`datastr for hour will be ${strHr}:${strMin}`)
}


timeStr()