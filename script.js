const questions = [
    { question: "What is 10 in binary?", options: ["10", "1010", "1100", "1001"], correctAnswer: 1 },
    { question: "What is 3 cubed?", options: ["9", "27", "18", "81"], correctAnswer: 1 },
    { question: "What is the GCD of 8 and 12?", options: ["2", "3", "4", "6"], correctAnswer: 2 },
    { question: "How many prime numbers are there between 10 and 20?", options: ["3", "4", "5", "6"], correctAnswer: 0 }
];

let currentQuestion = 0;
let correctAnswers = 0;
let timer = 60;
let timerInterval;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    questionElement.textContent = questions[currentQuestion].question;
    optionsContainer.innerHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    resetTimer();
    startTimer();
}

function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestion].correctAnswer) correctAnswers++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval);
        showResults();
    }
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
            checkAnswer(-1);
        }
    }, 1000);
}

function showResults() {
    const percentage = (correctAnswers / questions.length) * 100;
    const modal = document.getElementById("congratulations-modal");

    if (percentage >= 50) {
        modal.classList.remove("hidden");
        const copyButton = document.getElementById("copy-link-button");
        copyButton.addEventListener("click", () => {
            const link = document.getElementById("achievement-link");
            link.select();
            document.execCommand("copy");
            alert("Achievement link copied to clipboard!");
        });
    } else {
        alert(`You scored ${percentage.toFixed(2)}%. Better luck next time!`);
    }
}

loadQuestion();
