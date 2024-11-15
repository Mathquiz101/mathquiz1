// Quiz questions
const questions = [
    {
        question: "What is the base-10 system?",
        options: ["A numbering system with 8 as the base", "A numbering system with 16 as the base", "A numbering system with 10 as the base", "A numbering system with 2 as the base"],
        correctAnswer: 2
    },
    // Add additional questions here
];

let currentQuestion = 0;
let timer = 60;
let timerInterval;
let correctAnswers = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");

    questionElement.textContent = questions[currentQuestion].question;
    optionsContainer.innerHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextButton.classList.add("hidden");
    resetTimer();
    startTimer();
}

function checkAnswer(selectedOption) {
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    if (isCorrect) correctAnswers++;

    document.querySelectorAll(".option").forEach((button, index) => {
        button.disabled = true;
        if (index === questions[currentQuestion].correctAnswer) {
            button.style.backgroundColor = "#228b22"; // Correct answer color
        } else if (index === selectedOption) {
            button.style.backgroundColor = "#dc143c"; // Incorrect answer color
        }
    });

    clearInterval(timerInterval);
    document.getElementById("next-button").classList.remove("hidden");
}

function resetTimer() {
    timer = 60;
    document.getElementById("timer").textContent = timer;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            checkAnswer(-1); // No option selected
        }
    }, 1000);
}

document.getElementById("next-button").addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    const resultContainer = document.getElementById("result-container");
    const resultMessage = document.getElementById("result-message");

    const percentage = (correctAnswers / questions.length) * 100;

    if (percentage >= 50) {
        resultMessage.textContent = `Great job! You scored ${percentage.toFixed(2)}%. You have advanced to a new level!`;
    } else {
        resultMessage.textContent = `You scored ${percentage.toFixed(2)}%. Keep practicing to improve your skills.`;
    }

    document.getElementById("quiz-container").classList.add("hidden");
    resultContainer.classList.remove("hidden");

    // Copy link functionality
    const copyButton = document.getElementById("copy-link-button");
    const achievementLink = document.getElementById("achievement-link");
    copyButton.addEventListener("click", () => {
        achievementLink.select();
        document.execCommand("copy");
        alert("Achievement link copied to clipboard!");
    });
}

// Initialize quiz
loadQuestion();
