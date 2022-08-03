//  SYNTH.JS - Javascript lib for synthesizing Sleep Architectures

// Population Data Sleep Averages by Age
sleepAvgs = [ {Age: 5, TST: 536, Deep: 193, REM: 108, Light: 235, WakeT: 6},
  {Age: 10, TST: 525, Deep: 156, REM: 115, Light: 254, WakeT: 10},
  {Age: 15, TST: 465, Deep: 107, REM: 102, Light: 256, WakeT: 16},
  {Age: 25, TST: 430, Deep: 74, REM: 100, Light: 256, WakeT: 20},
  {Age: 35, TST: 396, Deep: 57, REM: 91, Light: 248, WakeT: 23},
  {Age: 45, TST: 380, Deep: 60, REM: 83, Light: 237, WakeT: 39},
  {Age: 55, TST: 380, Deep: 72, REM: 83, Light: 225, WakeT: 49},
  {Age: 65, TST: 364, Deep: 49, REM: 70, Light: 245, WakeT: 61},
  {Age: 75, TST: 343, Deep: 42, REM: 66, Light: 235, WakeT: 78},
  {Age: 85, TST: 319, Deep: 20, REM: 69, Light: 230, WakeT: 82},
];

// Top level request to synthesize a sleep model and display it as a Hypno Chart
async function synthSleep(surveyObject) {

  var resultsPanelEl = document.getElementById("sleep-data");  
  var synthedSleep = null;

 // initializePage();
  cleanUpAllCharts();

  lastSleepDiv = document.getElementById("lastSleep-amt");

  resultsPanelEl.style.display = "block";   
  lastSleepDiv.style.display = "block";

  // Synthesize a Sleep Architecture for 10 last night to 6:30 this morning for a 60 male
  const divEl = "chart-area1";
 // const startTime = LastNight(23, 0);
 // const endTime = ThisMorning(7, 0);

  var startStrs = surveyObject["inBedTime"].split(":");
  const startTime = LastNight(parseInt(startStrs[0]), parseInt(startStrs[1]));
  var endStrs = surveyObject["outOfBedTime"].split(":");
  const endTime = ThisMorning(parseInt(endStrs[0]), parseInt(endStrs[1]));
  const age = surveyObject["ageNum"];
  const muscleFeel = surveyObject["muscleScale"];
  const dreaming = surveyObject["dreamNum"];
  const wakes = surveyObject["wakeUpsNum"];

  sleepArch = SynthHypno(startTime, endTime, age);
  console.log("Synthesized Hypno = " + sleepArch.hypno);
  gCharts.push(CreateHypnoChart(divEl, "Age " + age + "-Based Sleep Architecture Estimate", startTime, endTime, sleepArch));
  gChartCount++;
 
  var newSleepArch, warpIndex, sleepState;

  sleepState = "Deep";
  warpIndex = muscleFeel;
  newSleepArch = WarpHypno(sleepArch, sleepState, 1, 5, warpIndex);
  console.log("===>" + sleepState + "Warped Arch:" + JSON.stringify(newSleepArch));
  gCharts.push(CreateHypnoChart("chart-area2", "Warped by " + sleepState + "/" + warpIndex, startTime, endTime, newSleepArch));
  gChartCount++;

  sleepState = "REM";
  warpIndex = dreaming;
  newSleepArch = WarpHypno(sleepArch, sleepState, 1, 5, warpIndex);
  console.log("===>" + sleepState + "Warped Arch:" + JSON.stringify(newSleepArch));
  gCharts.push(CreateHypnoChart("chart-area3", "Warped by " + sleepState + "/" + warpIndex, startTime, endTime, newSleepArch));
  gChartCount++;

  sleepState = "Wake";
  warpIndex = wakes;
  newSleepArch = WarpHypno(sleepArch, sleepState, 0, 5, warpIndex);
  console.log("===>" + sleepState + "Warped Arch:" + JSON.stringify(newSleepArch));
  gCharts.push(CreateHypnoChart("chart-area4", "Warped by " + sleepState + "/" + warpIndex, startTime, endTime, newSleepArch));
  gChartCount++;

  return (newSleepArch);
}

function CountStateTime(state, h) {
  var total = 0;
  h.forEach(element => {
    if (element.x == state) 
      total += (element.y[1] - element.y[0]);
  });
  return(total);
}


function createSleepState(state, cycleNo, t, age) {
  const millisecToMin = 60000;
  var start, end;

  switch (state) {
    case "Wake"  : 
        start = t;    // wake goes up with age
        ageCycleMins = (9 * age/10)/(8);
        end = t + (millisecToMin * (ageCycleMins + getRandomInt(5)));
        break;
    case "Light" :
        start =
        end = t + (millisecToMin * (40 + getRandomInt(5)));
        break;
    case "Deep" :
        start = t;
        deepCycleMins = (160 - age/10)/(4*3*2);   // deep goes down with age
        end = t + (millisecToMin * (Math.floor(6 - cycleNo) * deepCycleMins)); 
        break;
    case "REM" :
        start = t;
        end = t + (millisecToMin * ((cycleNo*10) + getRandomInt(5)));
        break;
  }
  return({x: state, y: [start, end]});
}

// Synthesizes a SleepArchitecture object based on population data averages and demographic information, and then 'warps'
// this sleep architecture based on the customer-subjective "feel" information
// startTime/endTime :  epoch millisecond start/end times
// age : years
function SynthHypno(startTime, endTime, age) {
  const sleepArch = {hypno: []};
  const cycleStates = ["Wake", "Light", "Deep", "REM"];
  var h;
  var sleepState;

  // Cycle through as many 'P90' cycles as we need to to fill in between 'startTime' and 'endTime' with sleep states
  h = [];
  cycleNo = 0;
  var now = startTime;
  while (now < endTime) {

    for (phase=0; phase < cycleStates.length; phase++) {
      sleepState = createSleepState(cycleStates[phase], cycleNo, now, age); 
      now = sleepState.y[1];
      if (now >= endTime) {
        console.log("----------------------Breaking cycle to WAKE!!!")
        sleepState.y[1] = endTime; 
        h.push(sleepState);
        h.push({x: "Wake", y: [endTime-1, endTime]});
        break;
      }
      h.push(sleepState);
    }
    cycleNo++
    console.log("SynthHypno Cycle #" + cycleNo);
  }
  // To make the format match what Jack's APIs return
  sleepArch.hypno = JSON.stringify(h);

  // Stuff some values into the rest of the Sleep Arch object
  sleepArch.score = 90;
  //   sleepArch.tst = 7 * (60 * 60 * 1000);
  sleepArch.tst = h[h.length-1].y[1] - h[0].y[0];
  sleepArch.timedeep = CountStateTime("Deep", h);
  //   sleepArch.timedeep =1.2 * (60 * 60 * 1000);
  sleepArch.timerem = CountStateTime("REM", h);
  sleepArch.timeawake = CountStateTime("Wake", h);

  return(sleepArch)
}

// function WarpHypno(sleepArch, sleepState, scaleLow, scaleHigh, value) when applied, returns a new Hypno that is “warped” to reflect a bias in the “sleepState”.
// For example, WarpHypno(h1, “Deep”, 1, 5, 5) corresponds to a survey result of “How Refreseded Do you Feel” and selecting “5” on a 1-5 scale.
function WarpHypno(sleepArch, sleepState, scaleLow, scaleHigh, value) {
console.log("Warping Hypno:" + JSON.stringify(sleepArch));

  const warpScalePercent = 0.2;
  var warpFactor = 1 + (value - (scaleHigh + scaleLow)/2) * warpScalePercent;  // the multiplier for the warp adjustment
  var stateWidth;
  const sa = JSON.parse(sleepArch.hypno);
  const numStates = sa.length;
  console.log("Num hypno states =" + numStates);
  for (i=0; i<numStates; i++) {
console.log("i:" + i);
    stateWidth = sa[i].y[1] - sa[i].y[0];
    // if this is one of our warp states, then warp it...
    if (sa[i].x == sleepState) {
console.log("Found a " + sleepState + " state!");
        sa[i].y[1] = sa[i].y[0] + stateWidth * warpFactor;
        if (i < numStates-1) 
          sa[i+1].y[0] = sa[i].y[1];  //increase/decrease the next state to meet it
    }
  }
  const newSA = {hypno: JSON.stringify(sa)};
  console.log("===>Warpend Hypno:" + newSA);
  return newSA;
}


// Helper functions for synthesizing hypnos
//======================================================

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Helper functino that returns utc epoch time corresponding to Last Night at Hour 
function LastNight(hour, min) {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() -24);  // go back a day
  startDate.setHours(hour, min, 0);
  console.log("Last Night =" + startDate.toLocaleString());
  return startDate.getTime();
}

//Helper functino that returns utc epoch time corresponding to Last Night at Hour 
function ThisMorning(hour, min) {
  const startDate = new Date();
  startDate.setHours(hour, min, 0);
  console.log("This Morning =" + startDate.toLocaleString());
  return startDate.getTime();
}

function epochTimeToHours(epochTime) {
  var elapsedHrs = Math.floor(epochTime/3600000);
  var elapsedMin = Math.floor(((epochTime/3600000) - elapsedHrs) * 60);
  return(elapsedHrs.toString() + ":" + elapsedMin.toString().padStart(2, '0'));
}