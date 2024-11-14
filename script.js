// Quiz questions
const questions = [
    {
        question: "What is the base-10 system?",
        options: ["A numbering system with 8 as the base", "A numbering system with 16 as the base", "A numbering system with 10 as the base", "A numbering system with 2 as the base"],
        correctAnswer: 2
    },
    {
        question: "How is a number expressed in binary?",
        options: ["Using digits 1 to 9", "Using digits 0 and 1", "Using hexadecimal letters", "Using Roman numerals"],
        correctAnswer: 1
    },
    {
        question: "What does the place value of a digit depend on?",
        options: ["Its position in the number", "Its size", "The number of other digits", "The base of the numbering system"],
        correctAnswer: 0
    },
    {
        question: "Which is the highest value in the base-10 system?",
        options: ["9", "8", "10", "1"],
        correctAnswer: 0
    },
    {
        question: "Which place value represents hundreds in the base-10 system?",
        options: ["10", "100", "1", "1000"],
        correctAnswer: 1
    },
    {
        question: "What is the hexadecimal representation of the decimal number 15?",
        options: ["D", "E", "F", "G"],
        correctAnswer: 2
    },
    {
        question: "How many bits are in a byte?",
        options: ["4", "8", "16", "32"],
        correctAnswer: 1
    },
    {
        question: "What is the base-2 equivalent of the decimal number 10?",
        options: ["1010", "10", "110", "1001"],
        correctAnswer: 0
    },
    {
        question: "Which base is commonly used in computing to represent color codes?",
        options: ["Binary", "Octal", "Hexadecimal", "Decimal"],
        correctAnswer: 2
    },
    {
        question: "In binary, what is the result of 1 + 1?",
        options: ["10", "11", "0", "1"],
        correctAnswer: 0
    },
    {
        question: "What is the decimal value of the binary number 1010?",
        options: ["5", "10", "8", "15"],
        correctAnswer: 1
    },
    {
        question: "Which base is also known as the octal system?",
        options: ["Base-16", "Base-8", "Base-2", "Base-10"],
        correctAnswer: 1
    },
    {
        question: "In hexadecimal, what digit follows 'F'?",
        options: ["E", "G", "10", "16"],
        correctAnswer: 2
    },
    {
        question: "How many symbols are there in the hexadecimal system?",
        options: ["2", "8", "10", "16"],
        correctAnswer: 3
    },
    {
        question: "What is the binary equivalent of the hexadecimal number 'A'?",
        options: ["1010", "1100", "1111", "1001"],
        correctAnswer: 0
    }
];


let currentQuestion = 0;
let timer = 60;
let timerInterval;

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
        document.getElementById("quiz-container").innerHTML = "<h2>Quiz Complete!</h2>";
    }
});

// Initialize quiz
loadQuestion();
