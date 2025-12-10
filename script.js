const questions = [
    {
        question: "HTML stands for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Modern Language", correct: false },
            { text: "High Transfer Markup Language", correct: false },
            { text: "Hyper Tech Multi Language", correct: false }
        ]
    },
    {
        question: "Which is a styling language?",
        answers: [
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "JavaScript is a?",
        answers: [
            { text: "Markup Language", correct: false },
            { text: "Programming Language", correct: true },
            { text: "Database", correct: false },
            { text: "Styling Tool", correct: false }
        ]
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreValue = document.getElementById("score-value");

function startQuiz() {
    currentIndex = 0;
    score = 0;
    scoreValue.textContent = score;
    restartBtn.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(ans => {
        const button = document.createElement("button");
        button.textContent = ans.text;
        button.classList.add("btn");
        if (ans.correct) button.dataset.correct = ans.correct;
        button.addEventListener("click", handleAnswer);
        answerButtonsEl.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hidden");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function handleAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        score--;
    }

    scoreValue.textContent = score;

    Array.from(answerButtonsEl.children).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showFinal();
    }
});

function showFinal() {
    resetState();
    questionEl.textContent = `Quiz Finished! Final Score: ${score}`;
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", startQuiz);

startQuiz();


const Confetti = () => {

    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 1.2,
            shapes: ["circle", "square"],
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });

        confetti({
            ...defaults,
            particleCount: 20,
            scalar: 2,
            shapes: ["emoji"],
            shapeOptions: {
                emoji: {
                    value: ["🦄", "🌈"],
                },
            },
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}