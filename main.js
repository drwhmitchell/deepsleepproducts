//  MAIN.JS - Main Javascript code for program

// gCharts keeps track of the list of charts created so we can destroy them 
var gCharts = []; 
var gChartCount = 1;
const gChartDiv = "chart-area";

// On Page Load function
function initializePage() {
  console.log("initializePage()");
  const surveyEl = document.getElementById("DeepSleep-Survey"); 
  const analysisEl = document.getElementById("DeepSleep-Analysis");  
  const solutionsEl = document.getElementById("DeepSleep-Solutions");  

  // Show the survey, hide the analysis and Solutions 
//  surveyEl.style.display = "block";
  analysisEl.style.display = "none";  // Hide login panel
  solutionsEl.style.display = "none";   // Hide results panel until we use control panel to generate some
}

function cleanUpAllCharts() {
  console.log("CleanUpAllCharts with gChartCount =" + gChartCount);
  // Nuke any live charts because we're about to create more....
  gCharts.forEach(chart => { if (chart) chart.destroy() });

  var chartHTML;
  // Also nuke any elements "innerHTML"
  for (i=1; i<gChartCount+1; i++) {
    chartHTML = document.getElementById("chart-area" + i);
console.log("Nuking InnnerHTML of Chart#" + i);
    chartHTML.innerHTML = "";
  }
  gChartCount = 1;
  gCharts = [];
}

// Returns an object that aggregates answers of the survey questions
function fetchSurveyResults() {
  const ageRangeEl = document.getElementById("ageRange");
  const inBedTimeEl = document.getElementById("inBedTime");
  const outOfBedTimeEl = document.getElementById("outOfBedTime");
  const sleepOnsetRangeEl = document.getElementById("sleepOnsetRange");
  const wakeUpRangeEl = document.getElementById("wakeUpRange");
  const wakeNumRangeEl = document.getElementById("wakeNumRange");
  const wasoRangeEl = document.getElementById("wasoRange");  
  const dreamRangeEl = document.getElementById("dreamRange");  
  const muscleRangeEl = document.getElementById("muscleRange");  
  const moodRangeEl = document.getElementById("moodRange");
  const overallRangeEl = document.getElementById("overallRange");


  return({ageNum: ageRangeEl.value, 
          inBedTime: inBedTimeEl.value,
          outOfBedTime: outOfBedTimeEl.value, 
          sleepOnsetMins: sleepOnsetRangeEl.value, 
          sleepEndMins: wakeUpRangeEl.value,
          wakeUpsNum: wakeNumRangeEl.value,
          wasoMins: wasoRangeEl.value, 
          dreamNum: dreamRangeEl.value, 
          muscleScale: muscleRangeEl.value, 
          moodScale: moodRangeEl.value, 
          overallScale: overallRangeEl.value} 
        );
}

function sleepSurvey() {
  // Show the survey, hide the analysis and Solutions 
  const surveyEl = document.getElementById("DeepSleep-Survey"); 
  const analysisEl = document.getElementById("DeepSleep-Analysis");  
  const solutionsEl = document.getElementById("DeepSleep-Solutions");  
  const surveyButton = document.getElementById("survey-button");  
  const analysisButton = document.getElementById("analysis-button");  
  const solutionsButton = document.getElementById("solutions-button");  

  surveyEl.style.display = "block";
  analysisEl.style.display = "none";  // Hide login panel
  solutionsEl.style.display = "none";   // Hide results panel until we use control panel to generate some
  surveyButton.className = "btn btn-primary btn-lg";  
  analysisButton.className = "btn btn-secondary btn-lg";  
  solutionsButton.className = "btn btn-secondary btn-lg";  
}

function sleepAnalysis() {

  console.log("Sleep Analysis"));

    // Show the analysis, hide the analysis and Solutions 
    const surveyEl = document.getElementById("DeepSleep-Survey"); 
    const analysisEl = document.getElementById("DeepSleep-Analysis");  
    const solutionsEl = document.getElementById("DeepSleep-Solutions");  
    const surveyButton = document.getElementById("survey-button");  
    const analysisButton = document.getElementById("analysis-button");  
    const solutionsButton = document.getElementById("solutions-button");  

    surveyEl.style.display = "none";
    analysisEl.style.display = "block";  // Hide login panel
    solutionsEl.style.display = "none";   // Hide results panel until we use control panel to generate some
    surveyButton.className = "btn btn-secondary btn-lg";  
    analysisButton.className = "btn btn-primary btn-lg";  
    solutionsButton.className = "btn btn-secondary btn-lg";  

    const surveyResults = fetchSurveyResults();
    console.log("Fetched SURVEY RESULTS: " + JSON.stringify(surveyResults));
    synthSleep(surveyResults);

}

function sleepSolutionss() {

  console.log("Sleep Solutions"));

  // Show the solutions, hide the analysis and Solutions 
  const surveyEl = document.getElementById("DeepSleep-Survey"); 
  const analysisEl = document.getElementById("DeepSleep-Analysis");  
  const solutionsEl = document.getElementById("DeepSleep-Solutions");  
  const surveyButton = document.getElementById("survey-button");  
  const analysisButton = document.getElementById("analysis-button");  
  const solutionsButton = document.getElementById("solutions-button");  

  surveyEl.style.display = "none";
  analysisEl.style.display = "none";  // Hide login panel
  solutionsEl.style.display = "block";   // Hide results panel until we use control panel to generate some
  surveyButton.className = "btn btn-secondary btn-lg";  
  analysisButton.className = "btn btn-secondary btn-lg";  
  solutionsButton.className = "btn btn-primary btn-lg";  
}