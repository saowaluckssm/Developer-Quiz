

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

const questionCounterEl = document.getElementById("questionCounter");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which of these tags would display the largest text",
    choice1: "< p >",
    choice2: "< h2 >",
    choice3: "< h6 >",
    answer: 2
  },

  {
    question: "What is the difference between HTML and CSS?",
    choice1: "CSS is one type of HTML",
    choice2: "There is no difference.",
    choice3: "HTML gives a webpage structure. CSS provides styling",
    answer: 3
  },
  {
    question: "How can you make a number list",
    choice1: "< list >",
    choice2: "< ol >",
    choice3: "< ul >",
    answer: 2
  },
  {
    question: "What dose CSS stand for?",
    choice1: "Creative Style Sheets",
    choice2: "Cascading style Sheets",
    choice3: "Colorful Style Spread",
    answer: 2
  },
  {
    question: "What is the purpose of < !DOCTYPE html >?",
    choice1: "Tells the web browser what language to expect",
    choice2: "Allows programmers to link to files in-line",
    choice3: "provides the web browser with security information",
    answer: 1
  }
]


const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter > MAX_QUESTIONS) {

    // save score to local storage
    localStorage.setItem("mostRecentScore", score);
    // go to end page
    return window.location.assign("end.html");
  }


  questionCounter++;

  
  questionCounterEl.innerHTML = questionCounter + "/" + MAX_QUESTIONS;


  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];

  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);

  acceptingAnswers = true;
};


choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    

    let classToApply = "incorrect";
       if (selectedAnswer == currentQuestion.answer) {
         classToApply = "correct";
       }
       console.log(classToApply);
        
       if (classToApply === "correct") {
         incrementScore(CORRECT_BONUS);
       }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {

      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();

    }, 500)
    
  });
});

//  increase score

incrementScore = num => {
  score += num;
  scoreEl.innerText = score;
}



startGame();