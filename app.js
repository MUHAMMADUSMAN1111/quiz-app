const quizSelector = document.getElementById("quiz-selector")
const quizContainer = document.getElementById("quiz-container")
const questionContainer = document.getElementById("question-container")
const resultsContainer = document.getElementById("results-container");
const answerButtonContainer = document.getElementById("answer-buttons-container");

class Quiz {
    constructor(questions) {
        this.questions = Quiz.stuffleArray(questions);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.displayQuestion();
    }

    displayQuestion() {
        answerButtonContainer.innerHTML = "";
        const currentQuestion = this.questions[this.currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        const answers = Quiz.stuffleArray(currentQuestion.answers);
        answers.forEach(answer => {
            const button = document.createElement("button");
            button.classList = ["answer-button"];
            button.textContent = answer;
            button.addEventListener("click", this.checkAnswer.bind(this));
            answerButtonContainer.appendChild(button);
        })
    }

    checkAnswer(event) {
        const selectedAnswer = event.target.textContent;
        const currentQuestion = this.questions[this.currentQuestionIndex];
        console.log(currentQuestion);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            this.score++;
        }

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.showResult();
        }
    }

    showResult(){
        quizContainer.style.display = "none";
        resultsContainer.style.display = "block";
        resultsContainer.innerHTML = `
        <h2> Quiz Result </h2> 
        <p>You scored ${this.score} out of ${this.questions.length} question </p>
        <button id="reload-quiz">Reload All Quiz</button>        
        `;
        document.getElementById("reload-quiz").addEventListener("click", ()=>{
            quizContainer.style.display = "none";
            resultsContainer.style.direction = "none";
            quizSelector.style.display = "flex";
        });
    }

    static stuffleArray(arr){
        return [...arr].sort(()=> Math.random() -0.5);
    }
}

    const loadQuiz = (question) => {
        const quiz = new Quiz(question);
        // quiz.displayQuestion();
        quizContainer.style.display = "block";
        quizSelector.style.display = "none";
    }

    const loadAllQuiz = async () => {
        const response = await fetch("./quiz.json");
        const quizzes = await response.json();

        quizzes.forEach((quiz, index) => {
            const quizCard = document.createElement("div");
            quizCard.classList = ["quiz-card"];
            quizCard.innerHTML = "Quiz" + (index + 1);
            quizCard.addEventListener("click", () => loadQuiz(quiz));
            quizSelector.appendChild(quizCard);
        });
    };

    loadAllQuiz();
