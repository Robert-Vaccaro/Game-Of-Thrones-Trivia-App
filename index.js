let questionNumber = 0;
let score = 0;


function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

function changeQuestionNumber () {

    questionNumber ++;

  $('.questionNumber').text(questionNumber+1);
}


function changeScore () {
  score ++;
}


function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}


function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}


function updateScore () {
  changeScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Great job!</h3><img src="https://watchersonthewall.com/wp-content/uploads/2019/01/smilesmilesmile.jpg" alt="Smiling Dany"/><p>You got ${score} / 10</p><p>You Truly Know Game of Thrones!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Not too bad!</h3><img src="https://images.immediate.co.uk/volatile/sites/3/2017/08/gallery-1469021490-kit-harington-sad-jon-snow-game-of-thrones00.jpg?quality=90&resize=620,413" alt="Jon Snow"/><p>You got ${score} / 10</p><p>You may have to rewatch some of the episodes though!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>I'll be honest with you,</h3><img src="https://fsmedia.imgix.net/37/7a/4c/f9/3991/43ab/8539/3e07ac2e962c/dany-game-of-thrones-season-8-episode-6-finale-spoilers.jpeg?crop=edges&fit=crop&auto=format%2Ccompress&dpr=2&h=323&w=646" alt="Sad Dany"/><p>You got ${score} / 10</p><p>I would strongly suggest rewatching every episode.</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
