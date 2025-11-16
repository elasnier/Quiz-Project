// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question:
      "Dans Call of Duty: Modern Warfare (2019), quel personnage est capitaine du SAS et dirige la Task Force 141 ?",
    answers: [
      { text: "Alex", correct: false },
      { text: "Ghost", correct: false },
      { text: "Price", correct: true },
      { text: "Farah", correct: false },
    ],
  },
  {
    question:
      "Quel jeu a popularisé le mode Battle Royale dans le genre FPS à grande échelle avant l’arrivée d’Apex et Warzone ?",
    answers: [
      { text: "Escape From Tarkov", correct: false },
      { text: "PUBG", correct: true },
      { text: "Valorant", correct: false },
      { text: "Rainbow Six Siege", correct: false },
    ],
  },
  {
    question:
      "Dans Counter-Strike: Global Offensive, quelle arme est la plus utilisée par les joueurs CT en rifle principal ?",
    answers: [
      { text: "AK-47", correct: false },
      { text: "AUG", correct: false },
      { text: "FAMAS", correct: false },
      { text: "M4A4 / M4A1-S", correct: true },
    ],
  },
  {
    question:
      "Dans Apex Legends, quel personnage est classé dans le rôle “Recon” (capable de scanner les beacons) ?",
    answers: [
      { text: "Mirage", correct: false },
      { text: "Gibraltar", correct: false },
      { text: "Pathfinder", correct: true },
      { text: "Fuse", correct: false },
    ],
  },
  {
    question:
      "Dans DOOM Eternal, l’arme emblématique la plus associée au Slayer est :",
    answers: [
      { text: "Plasma Rifle", correct: false },
      { text: "Rocket Launcher", correct: false },
      { text: "Super Shotgun", correct: true },
      { text: "Heavy Cannon", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // Reset Vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn");

    // what is dataset?
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // Optimization check
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton){
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "C'EST QUI LE PATRON? C'est moiii";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Bon Boulot! Tu connais ton football";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Ouais pas maaal! Continue d'essayer";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Mouaiiiis! Tu peux faire mieux";
  } else {
    resultMessage.textContent = "Pas ouf ça ! Lâche pas l'école";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
