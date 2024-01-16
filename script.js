const questions = [
  {
    question:
      'Who is the author of the classic novel "Pride and Prejudice," depicting the social issues of 18th-century England?',
    options: [
      "A) Jane Austen",
      "B) Charlotte Brontë",
      "C) Emily Dickinson",
      "D) Virginia Woolf",
    ],
    answer: "A) Jane Austen",
  },
  {
    question:
      'In F. Scott Fitzgerald\'s novel "The Great Gatsby," what is the profession of the protagonist, Jay Gatsby?',
    options: ["A) Lawyer", "B) Businessman", "C) Writer", "D) Bootlegger"],
    answer: "D) Bootlegger",
  },
  {
    question:
      "What is the title of Gabriel García Márquez's magical realist novel, chronicling seven generations of the Buendía family?",
    options: [
      "A) One Hundred Years of Solitude",
      "B) Love in the Time of Cholera",
      "C) Chronicle of a Death Foretold",
      "D) Of Love and Other Demons",
    ],
    answer: "A) One Hundred Years of Solitude",
  },
  {
    question:
      'Who is the protagonist of the epic poem "Paradise Lost" written by John Milton?',
    options: ["A) Adam", "B) Satan", "C) God", "D) Raphael"],
    answer: "B) Satan",
  },
  {
    question:
      'Which Russian author penned the novel "Crime and Punishment," exploring the psychological struggles of a young intellectual?',
    options: [
      "A) Leo Tolstoy",
      "B) Fyodor Dostoevsky",
      "C) Anton Chekhov",
      "D) Ivan Turgenev",
    ],
    answer: "B) Fyodor Dostoevsky",
  },
  {
    question:
      "What is the title of Aldous Huxley's dystopian novel, depicting a futuristic society controlled by technology and conformity?",
    options: [
      "A) Brave New World",
      "B) 1984",
      "C) Fahrenheit 451",
      "D) The Handmaid's Tale",
    ],
    answer: "A) Brave New World",
  },
  {
    question:
      'In Mary Shelley\'s novel "Frankenstein," what is the name of the scientist who creates the creature?',
    options: [
      "A) Victor Frankenstein",
      "B) Henry Clerval",
      "C) Robert Walton",
      "D) Elizabeth Lavenza",
    ],
    answer: "A) Victor Frankenstein",
  },
  {
    question:
      'Who wrote the play "Romeo and Juliet," a tragic love story set in Verona?',
    options: [
      "A) William Shakespeare",
      "B) Christopher Marlowe",
      "C) Ben Jonson",
      "D) John Webster",
    ],
    answer: "A) William Shakespeare",
  },
  {
    question:
      "What is the title of Chinua Achebe's novel that explores the impact of colonialism on African society?",
    options: [
      "A) Things Fall Apart",
      "B) Arrow of God",
      "C) No Longer at Ease",
      "D) Anthills of the Savannah",
    ],
    answer: "A) Things Fall Apart",
  },
  {
    question:
      'Which American author wrote the novel "The Grapes of Wrath," depicting the struggles of the Joad family during the Great Depression?',
    options: [
      "A) Ernest Hemingway",
      "B) John Steinbeck",
      "C) F. Scott Fitzgerald",
      "D) Ray Bradbury",
    ],
    answer: "B) John Steinbeck",
  },
];

const questionText = document.querySelector(".question-text");
const nextBtn = document.getElementById("next-btn");
const timeLeft = document.getElementById("time-left");
const tryAgainBtn = document.getElementById("try-again");
const startGameBtn = document.getElementById("start-btn");
const totalQuestion = document.querySelector(".total-question");
const optionList = document.querySelector(".option-list");
const startGameWrapper = document.querySelector(".start-game-btn");
const headerScore = document.querySelector(".header-score");
const quizBox = document.querySelector(".quiz");
const resultBox = document.querySelector(".result-box");

let questionCount = 0;
let userAnswered = false;
let userScore = 0;

startGameBtn.addEventListener("click", () => {
  quizBox.classList.remove("hide");
  startGameWrapper.classList.add("hide");
  startTimer();
});
tryAgainBtn.addEventListener("click", () => {
  quizBox.classList.add("hide");
  resultBox.classList.remove("show");
  nextBtn.classList.remove("active");
  startGameWrapper.classList.remove("hide");

  questionCount = 0;
  userScore = 0;
  showQuestion();
  questionCounter();
  scoreCounter();
});

nextBtn.addEventListener("click", () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionCounter();
    scoreCounter();
    resetTimer();
    startTimer();
  } else {
    showResult();
    resetTimer();
  }
  showQuestion();
  nextBtn.classList.remove("active");
});

function showQuestion() {
  questionText.innerText = `${questionCount + 1}. ${
    questions[questionCount].question
  }`;

  let optionTag = `<p class="option">${questions[questionCount].options[0]}</p>
                    <p class="option">${questions[questionCount].options[1]}</p>
                    <p class="option">${questions[questionCount].options[2]}</p>
                    <p class="option">${questions[questionCount].options[3]}</p>`;

  optionList.innerHTML = optionTag;

  let options = document.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    options[i].setAttribute("onclick", "selectedOption(this)");
  }
}

function selectedOption(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  userAnswered = true;

  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore++;
    scoreCounter();
  } else {
    answer.classList.add("incorrect");
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
  resetTimer();
}

function questionCounter() {
  totalQuestion.innerHTML = `${questionCount + 1} out of ${
    questions.length
  } Question`;
}

function scoreCounter() {
  headerScore.innerHTML = `Score: ${userScore} / ${questions.length}`;
}

function showResult() {
  resultBox.classList.add("show");
  quizBox.classList.add("hide");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");

  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#6824c1 ${
      progressStartValue * 3.6
    }deg, rgba(0, 0, 0, 0.2) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}

function startTimer() {
  let timeInSeconds = 10;
  timeLeft.innerHTML = `<i class="ri-timer-line"></i>Time Left: ${timeInSeconds}s`;

  timer = setInterval(() => {
    timeInSeconds--;

    if (timeInSeconds < 0) {
      timeInSeconds = 0;
      clearInterval(timer);

      if (!userAnswered) {
        autoSelectCorrectOption();
        disableOptions();
        activateNextButton();
      }
    }

    timeLeft.innerHTML = `<i class="ri-timer-line"></i>Time Left: ${timeInSeconds}s`;
  }, 1000);
}

function disableOptions() {
  const options = document.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled");
  }
}

function activateNextButton() {
  nextBtn.classList.add("active");
}

function resetTimer() {
  clearInterval(timer);
}

function autoSelectCorrectOption() {
  const options = document.querySelectorAll(".option");
  const correctAnswer = questions[questionCount].answer;

  for (let i = 0; i < options.length; i++) {
    if (options[i].textContent === correctAnswer) {
      options[i].classList.add("correct");
      break;
    }
  }
}

showQuestion();
