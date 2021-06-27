const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const {
  coreSubjectList,
  dsaQuestionList,
  mainMenu,
  webDevelopementList,
  jobInformationQuestion,
  dsaQuestion,
} = require("./question.js");
const xlsx = require("xlsx");

let pepcodingLink = "https://www.youtube.com/watch?v=mrEcfu-ByDw&list=PL-Jc9J83PIiEeD3I4VXETPDmzJ3Z1rWb4";
let traversyMediaLink = "https://www.youtube.com/playlist?list=PLillGF-RfqbYeckUaD1z6nviTp31GLTH8";
let userProblemList = [];
let difficultyList = ["Hard", "Easy", "Medium", "hard", "medium", "easy"];


console.log("This is a multi-purpose command line interface.");

inquirer.prompt(mainMenu).then((answers) => {
  switch (answers.userChoice) {
    case "Data Structure and Algorithm":
      solveDsa();
      break;
    case "Core Subject":
      solveCoreSubject();
      break;
    case "Web Developement":
      solveWebDev();
      break;
    case "Job Information":
      solveJob();
      break;
    default:
      return;
  }
});

function solveWebDev() {
  inquirer.prompt(webDevelopementList).then((answers) => {
    console.log(answers.userChoice);
    switch (answers.userChoice) {
      case "Pepcoding":
        getWebDevData(pepcodingLink);
        break;
      case "Traversy Media":
        getWebDevData(traversyMediaLink);
        break;
      default:
        return;
    }
  });
}
function solveCoreSubject() {
  inquirer.prompt(coreSubjectList).then((answers) => {
    console.log(answers.userChoice);
    getCoreSubjectData(answers.userChoice);
  });
}

function solveJob() {
  inquirer.prompt(jobInformationQuestion).then((answers) => {
    getJobInformation(answers.userChoice, answers.userCityChoice);
  });
}

function solveDsa() {
  inquirer.prompt(dsaQuestionList).then((answers) => {
    if (answers.userChoice == "Leetcode") {
      inquirer.prompt(dsaQuestion).then((answers) => {
        if (!difficultyList.includes(answers.difficultyChoice)) {
          console.log("Not a valid input.");
          return;
        } else {
          console.log("Fetching data...................");
          getLeetCodeData(answers.userChoice, answers.difficultyChoice);
        }
      });
    } else if (true) {
    }
  });
}

async function getJobInformation(userJobChoice, userLocation) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/jobs/search?position=1&pageNum=0");
  await page.waitForSelector("[placeholder ='Search job titles or companies']");
  await page.type(
    '[placeholder ="Search job titles or companies"]',
    userJobChoice
  );
  await page.click("[placeholder ='Location']");
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("KeyX");
  await page.keyboard.up("Control");
  await page.type("[placeholder ='Location']", userLocation);
  await page.click(
    '[data-tracking-control-name="public_jobs_jobs-search-bar_base-search-bar-search-submit"]'
  );
  await page.waitForNavigation();
}

async function getLeetCodeData(userChoice, difficultyChoice) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  await page.goto("https://leetcode.com/problemset/all");
  await page.waitForSelector(".flex.relative.mb-1 a");

  let allTopic = await page.evaluate(function () {
    let allTag = document.querySelectorAll(".flex.relative.mb-1 a");
    let allTopicList = {};

    for (let i = 0; i < allTag.length; i++) {
      let tagName = allTag[i].innerText.split("\n")[0];
      let anchorLink = "https://leetcode.com" + allTag[i].getAttribute("href");
      allTopicList[tagName] = anchorLink;
    }
    return allTopicList;
  });

  userChoice = userChoice[0].toUpperCase() + userChoice.substring(1);
  let useChoiceExist = Object.keys(allTopic).includes(userChoice);
  let difficultyChoiceExist = difficultyList.includes(difficultyChoice);
  if (useChoiceExist && difficultyChoiceExist) {
    // do nothing
  } else {
    console.log("Please enter correct value");
    await browser.close();
    return;
  }

  await Promise.all([
    page.goto(allTopic[userChoice]),
    page.waitForNavigation()
  ]) 
  
  await page.waitForSelector(".title-cell__ZGos>a");

  userProblemList = await page.evaluate(function (difficultyChoice) {
    let problemLinkList = document.querySelectorAll(".title-cell__ZGos>a");
    let problemDifficultyList = document.querySelectorAll("[label = 'Difficulty']");
    let allProblemList = [];
    let userChoiceMap;
    for (let i = 0; i < problemLinkList.length; i++) {
   
      let problemTitle = problemLinkList[i].innerText;
      let prolemLink =
        "https://leetcode.com" + problemLinkList[i].getAttribute("href");
      if (problemDifficultyList[i].innerText.toLowerCase() == difficultyChoice) {
     
        userChoiceMap = { problemTitle, prolemLink };
        allProblemList.push(userChoiceMap);
      }
    }
    
    return allProblemList;
  }, difficultyChoice);
  await writeInExcel(userProblemList);
  console.log("A copy of data is saved in your current directory.")
  await browser.close();
}

function getCoreSubjectData(userChoice) {}

async function getWebDevData(userChoice) {
  let totalvideos = 0;
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto(userChoice);
  await page.waitForSelector("#stats .style-scope.yt-formatted-string");
  totalvideos = await page.evaluate(function () {
    let videoCount = document.querySelectorAll(
      "#stats .style-scope.yt-formatted-string"
    )[0];
    console.log(videoCount.innerText);
    return Number(videoCount.innerText);
  });
  console.log(totalvideos);
  // await page.waitForSelector(
  //   "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
  // );
  // await page.waitForSelector("a#video-title");
  // await page.evaluate(async function (totalvideos) {
  //   let durationList = document.querySelectorAll(
  //     "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
  //   );
  //   let videoTitleList = document.querySelectorAll("a#video-title");

  //   await new Promise(function (resolve, reject) {
  //     let interval = setInterval( function () {
  //       if (totalvideos != durationList.length) {
  //         let videoCardContainer = document.querySelector("#contents");
  //         window.scrollTo(0, videoCardContainer.scrollHeight);
  //         durationList = document.querySelectorAll(
  //           "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
  //         );
  //       } else {
  //         clearInterval(interval);
  //         resolve();
  //       }
  //     }, 500);
  //   });

  //   let allvideoLink = [];
  //   let allDuration = [];
  //   let allTitle = [];
  //   for (let i = 0; i < durationList.length; i++) {
  //     allTitle[i] = allvideoLink[i].innerText;
  //     allDuration.push(durationList[i].innerText.trim());
  //     allvideoLink.push(
  //       "https://www.youtube.com" + videoTitleList[i].getAttribute("href")
  //     );

  //     console.log(allTitle[i], allDuration[i], allvideoLink[i]);
  //   }

  // }, totalvideos);
}

// console.log(allProblemList);
// let data = {"abc":"hrefjsdgu", "ajhsduha":"ahdjahdj", "sjhkcusdghdk":"jakjahdkjas", "lkshdjlhwjd":"aklhsdlhajlhdjas"};
function writeInExcel(userProblemList){
let newWB = xlsx.utils.book_new();
let newWS = xlsx.utils.json_to_sheet(userProblemList);
xlsx.utils.book_append_sheet(newWB, newWS, "first");
xlsx.writeFile(newWB, "list.xlsx");
}
