//  MAIN.JS - Main Javascript code for program


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

}

function sleepSolutionss() {
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