const questions = [
{
	question : "What is the name of the curse that killed Professor Albus Dumbledore?",
	answers:[
	{text:"Avada Kedavra",correct: true},
	{text: "Crucio",correct: false},
	{text: "Imperio",correct:false},
	{text: "Sectumsempra",correct:false}
	]
},
{
	question : "Which magical creature can detect and kill Horcruxes?",
	answers:[
	{text:"Niffler",correct: false},
	{text: "Thestral",correct: true},
	{text: "Acromantula",correct:false},
	{text: "Basilisk",correct:false}
	]
},
{
	question : "What is the core of Harry Potter's wand?",
	answers:[
	{text:"Phoenix feather",correct: true},
	{text: "Dragon heartstring",correct: false},
	{text: "Unicorn hair",correct:false},
	{text: "Veela hair",correct:false}
	]
},
{
	question : "Who is the author of the book 'Fantastic Beasts and Where to Find Them' within the Harry Potter universe?",
	answers:[
	{text:"Newt Scamander",correct: true},
	{text: "Gilderoy Lockhart",correct: false},
	{text: "Albus Dumbledore",correct:false},
	{text: "Bathilda Bagshot",correct:false}
	]
}
];

const questionElement= document.getElementById("question");
const answerButton= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
	currentQuestionIndex=0;
	score=0;
	nextButton.innerHTML="Next"
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion=questions[currentQuestionIndex];
	let questionNo= currentQuestionIndex+1;
	questionElement.innerHTML= questionNo+". "+currentQuestion.question;
	currentQuestion.answers.forEach(answer =>{
		const button= document.createElement("button");
		button.innerHTML=answer.text;
		button.classList.add("btn");
		answerButton.appendChild(button);
		if(answer.correct){
			button.dataset.correct=answer.correct;
		}
		button.addEventListener("click",selectAnswer);

	}

		);
}

function resetState(){
	nextButton.style.display ="none"
	while(answerButton.firstChild){
		answerButton.removeChild(answerButton.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn=e.target;
	const isCorrect=selectedBtn.dataset.correct==="true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}
	else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButton.children).forEach(button =>
{
	if(button.dataset.correct==="true"){
		button.classList.add("correct");
	}
	button.disabled=true;
}
		);
	nextButton.style.display= "block";
}

function showScore(){
	resetState();
	questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML="Play Again";
	nextButton.style.display="block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex<questions.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click",()=>{
	if(currentQuestionIndex<questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
});

startQuiz();