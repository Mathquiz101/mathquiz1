// Array of intense quiz questions on Numbers and Numerations
const questions = [
    {
        question: "What is the smallest positive integer that is divisible by all integers from 1 to 10?",
        options: ["2520", "3600", "5040"],
        answer: "2520"
    },
    {
        question: "In the base-10 system, what is the sum of the first 100 positive odd numbers?",
        options: ["5000", "10000", "10000"],
        answer: "10000"
    },
    {
        question: "What is the prime factorization of 123456?",
        options: ["2^6 x 3 x 643", "2 x 3^3 x 137 x 239", "2^4 x 3^2 x 7"],
        answer: "2^6 x 3 x 643"
    },
    {
        question: "If a sequence follows the Fibonacci rule, what is the 15th term starting with 0, 1?",
        options: ["610", "987", "1597"],
        answer: "610"
    },
    {
        question: "What is the smallest number greater than 1 that is both a perfect square and a perfect cube?",
        options: ["64", "729", "4096"],
        answer: "64"
    }
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 10;

// Select DOM elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-button');

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion();
}

// Display the current question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// Reset the state for the next question
function resetState() {
    clearInterval(timer);
    optionsContainer.innerHTML = '';  // Clear previous options
    nextButton.classList.add('hidden');  // Hide next button until the question is answered
    timeLeft = 10;
    timerElement.innerText = timeLeft;  // Reset timer
}

// Handle option selection
function selectOption(selectedOption) {
    clearInterval(timer);  // Stop the timer when an option is selected
    const correctAnswer = questions[currentQuestionIndex].answer;

    // Disable all options after selecting an answer
    document.querySelectorAll('.option').forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong! The correct answer was: " + correctAnswer);
    }

    // Show next button after answering
    nextButton.classList.remove('hidden');
}

// Move to the next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();  // Load next question
    } else {
        alert("Quiz finished!");
        nextButton.classList.add('hidden');  // Hide the button after quiz completion
    }
});

// Start the countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;  // Update the timer display
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectOption("");  // If time runs out, force submission
        }
    }, 1000);
}

// Start the quiz when the page loads
window.onload = startQuiz;
