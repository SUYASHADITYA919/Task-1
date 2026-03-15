const questions = [
    { q: "Which property is used to change background color?", 
      a: ["color", "bgcolor", "background-color", "fill"],
      correct: 2 
    },
    { q: "How do you create a function in JavaScript?",
     a: ["function myFunc()", "def myFunc()", "func:myFunc()", "new function()"],
     correct: 0 
    },
    { q: "What does HTML stand for?", 
      a: ["Hyper Tool Multi Language", "Hyper Text Markup Language", "Hyperlink Text Management", "Home Tool Markup Language"], 
      correct: 1 
    },
    { q: "Which Tailwind class makes a text bold?",
      a: ["font-heavy", "text-bold", "font-bold", "style-bold"], 
      correct: 2 
    },
    { q: "What is the most widely used programming language for web development?", 
      a: ["JavaScript", "Python", "Java", "C++"], 
      correct: 0 
    },
    { q: "Which programming language is known for its use in artificial intelligence and machine learning?", 
      a: ["JavaScript", "Python", "C", "C++"], 
      correct: 1 
    },
    { q: "Which programming language is known for its speed and is often used in game development?", 
      a: ["C", "Python", "JavaScript", "C++"],
      correct: 0 
    },
    { q: "What is the shortest possible Hello, World! program in Python?", 
      a: ["echo 'Hello, World!'print", "('Hello, World!')", "Console.WriteLine('Hello, World!')", "alert('Hello, World!')"], 
      correct: 1 }
      ,
    { q: "which of the following is not a programming padadigm?", 
      a: ["Object-Oriented Programming", "Functional Programming", "Procedural Programming", "Structured Programming"], 
      correct: 3 
    },
    { q: "Which of the following is not a JavaScript framework?", 
      a: ["React", "Vue", "Angular", "Laravel"], 
      correct: 3 
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let highscore = localStorage.getItem('quizzy-highscore') || 0;

let timeLeft = 50;
let timerInterval;
const totalTime = 50;
const dashArray = 150.8; 

const displayArea = document.getElementById('display-area');
const timerContainer = document.getElementById('timer-container');
const timerText = document.getElementById('timer-text');
const timerProgress = document.getElementById('timer-progress');

function showWelcome() {
    timerContainer.classList.add('hidden'); 
    displayArea.innerHTML = `
        <div class="mt-10 flex items-center justify-between">
            <button onclick="startQuiz()" class="bg-white text-[#1a2a44] px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-yellow-400 transition-all shadow-lg active:scale-95">
                let's begin <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers.fill(null);
    timerContainer.classList.remove('hidden'); 
    resetTimer();
    renderQuestion();
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    updateTimerUI();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            calculateAndShowResults(); 
        }
    }, 1000);
}

function updateTimerUI() {
    timerText.innerText = timeLeft;
    const offset = dashArray - (timeLeft / totalTime) * dashArray;
    timerProgress.style.strokeDashoffset = offset;
    
    if (timeLeft <= 10) {
        timerText.classList.add('text-red-500');
    } else {
        timerText.classList.remove('text-red-500');
    }
}
// -------------------

function renderQuestion() {
    const data = questions[currentQuestion];
    displayArea.innerHTML = `
        <div class="animate-pop h-full flex flex-col">
            <h2 class="text-2xl font-bold text-white mb-1">Question ${currentQuestion + 1}</h2>
            <p class="text-gray-400 mb-6 text-sm">Select the best answer</p>
            <div class="glass-card p-6 rounded-3xl mb-6 bg-white/5 border border-white/10">
                <p class="text-white text-lg font-medium">${data.q}</p>
            </div>
            <div class="space-y-4 flex-grow">
                ${data.a.map((opt, i) => {
                    const isSelected = userAnswers[currentQuestion] === i;
                    return `
                    <button id="opt-${i}" 
                        onclick="toggleOption(${i})" 
                        class="option-btn w-full text-left p-4 rounded-2xl border ${isSelected ? 'border-yellow-400 bg-white/5 selected' : 'border-gray-600'} text-white transition-all duration-200 hover:border-yellow-400 group flex justify-between items-center">
                        <span>${opt}</span>
                        <div class="checkbox-circle w-6 h-6 rounded-full border-2 ${isSelected ? 'border-yellow-400' : 'border-gray-600'} group-hover:border-yellow-400 flex items-center justify-center transition-all">
                            <i class="fas fa-circle text-yellow-400 ${isSelected ? 'scale-100' : 'scale-0'} transition-transform duration-200"></i>
                        </div>
                    </button>`;
                }).join('')}
            </div>
            <div class="mt-6 flex flex-col gap-4">
                <button onclick="clearSelection()" class="w-full py-3 rounded-2xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all font-medium">
                    <i class="fas fa-rotate-left mr-2"></i> Clear Selection
                </button>
                <div class="flex justify-between items-center gap-4">
                    ${currentQuestion > 0 ? `<button onclick="prevQuestion()" class="flex-1 py-4 rounded-2xl border border-gray-600 text-white hover:bg-gray-800">Previous</button>` : '<div class="flex-1"></div>'}
                    <button onclick="nextBtnAction()" class="flex-1 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:bg-yellow-400">
                        ${currentQuestion === questions.length - 1 ? 'Finish' : 'Next'} <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function toggleOption(index) {
    userAnswers[currentQuestion] = index;
    renderQuestion();
}

function clearSelection() {
    userAnswers[currentQuestion] = null;
    renderQuestion();
}

function nextBtnAction() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        calculateAndShowResults();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function calculateAndShowResults() {
    clearInterval(timerInterval); 
    timerContainer.classList.add('hidden'); 
    score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === questions[i].correct) score++;
    });
    renderResults();
}

function renderResults() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('quizzy-highscore', highscore);
    }
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const percentage = (score / questions.length) * 100;
    const offset = circumference - (percentage / 100) * circumference;

    displayArea.innerHTML = `
        <div class="animate-pop text-center flex flex-col items-center justify-center flex-grow">
            <h2 class="text-3xl font-bold text-white mb-2">Well Done!</h2>
            <div class="relative flex items-center justify-center my-8">
                <svg class="w-48 h-48 transform -rotate-90">
                    <circle class="text-gray-800" stroke-width="12" stroke="currentColor" fill="transparent" r="${radius}" cx="96" cy="96"/>
                    <circle class="text-yellow-400" stroke-width="12" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" stroke="currentColor" fill="transparent" r="${radius}" cx="96" cy="96"/>
                </svg>
                <div class="absolute text-white rotate-90">
                    <span class="text-5xl font-bold">${score}</span>
                    <span class="text-xl text-gray-400">/${questions.length}</span>
                </div>
            </div>
            <div class="w-full bg-white/5 border border-white/10 p-5 rounded-3xl flex justify-between items-center mb-8">
                <span class="text-gray-300">High Score</span>
                <span class="text-2xl font-bold text-pink-500">${highscore}</span>
            </div>
            <button onclick="startQuiz()" class="w-full py-4 bg-yellow-400 text-[#1a2a44] font-extrabold rounded-full hover:bg-white transition-all">PLAY AGAIN</button>
        </div>
    `;
}

showWelcome();