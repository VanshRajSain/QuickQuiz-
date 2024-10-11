const questions = [
    {
        question:"Which of the following is a web development framework?",
        answer:[
            { text: "TensorFlow", correct: false},
            { text: "React", correct: true},
            { text: "Hadoop", correct: false},
            { text: "PyTorch", correct: false},
        ]
    },
    {
        question:"What does CPU stands for?",
        answer:[
            { text: "Central Processing Unit", correct: true},
            { text: "Central Programming Unit", correct: false},
            { text: "Computer Processing Unit", correct: false},
            { text: "Central Power Unit", correct: false},
        ]
    },
    {
        question:"Which company developed the Android Operating System?",
        answer:[
            { text: "Apple", correct: false},
            { text: "Google", correct: true},
            { text: "Microsoft", correct: false},
            { text: "Amazon", correct: false},
        ]
    },
    {
        question:"Which protocol is used for secure communication over the Internet?",
        answer:[
            { text: "HTTP", correct: false},
            { text: "FTP", correct: false},
            { text: "HTTPS", correct: true},
            { text: "SMTP", correct: false},
        ]
    }
];
const questionElement = document.getElementById( "question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",SelectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function SelectAnswer(e){
    const SelectedBtn = e.target;
    const isCorrect = SelectedBtn.dataset.correct === "true";
    if(isCorrect){
        SelectedBtn.classList.add("correct");
        score++;
    }else{
        SelectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();