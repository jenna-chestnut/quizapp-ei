/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

const grabStart = () => {
  return ` <h2>Test your knowledge!</h2>
  <div class="block">
    <h3>Ready to start?</h3>
    <button id="beginQuiz">
      Click here!<br />
    </button>
    <p class="tally">5 questions total!</p>
  </div>`
}

const grabQuestion = (index) => {
  store.questionNumber++
  let option = store.questions[index].answers
  return `<h2>${store.questions[index].question}</h2>
          <div class="block questions">
            <h3>Question ${store.questionNumber}</h3>
            <form id="questionForm">                
              <input type="radio" id="A" value="${option[0]}" name="spaceqs"></input>
              <label for="A">${option[0]}</label>
              <input type="radio" id="B" value="${option[1]}" name="spaceqs"></input>
              <label for="B">${option[1]}</label>
              <input type="radio" id="C" value="${option[2]}" name="spaceqs"></input>
              <label for="C">${option[2]}</label>
              <input type="radio" id="D" value="${option[3]}" name="spaceqs"></input>
              <label for="D">${option[3]}</label>
              <input type="submit" value="submit">
            </form>
            <p class="tally">Correct: ${store.score}, Incorrect: ${index - store.score}</p>
          </div>`
}

const grabAnswer = (results, index) => {
  return `<h2>Answered View</h2>
  <div class="block">
    <h3>${results === "correct" ? "You got it!" : "Sorry..."}</h3>
<p>${store.questions[index].correctAnswer}</p>
    <button id="nextQuestion">Next Question</button>
    <p class="tally">Correct: ${store.score}, Incorrect: ${index - store.score}</p>
  </div>`
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
const renderQuiz = (callback) => {
  if (store.quizStarted === false) {
    $('main').html(grabStart());
  }
  if (store.quizStarted === true) {
    $('main').html(callback);
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

const tally = () => {
  let index = 0

  $('main').submit(event => {
    event.preventDefault()
    let correct = store.questions[index].correctAnswer
    let checked = $('input[name="spaceqs"]:checked').val()
    if (correct.includes(checked)) {
      store.score++
      renderQuiz(grabAnswer("correct", index))
      console.log("Yay!")
    } else {
      renderQuiz(grabAnswer("incorrect", index))
      console.log("lame...")
    }
    index++
  })
}

const beginQuiz = () => {
  $('#beginQuiz').click(event => {
    store.quizStarted = true;
    $('main').html(grabQuestion(0))
  })
}

const main = () => {
  renderQuiz();
  beginQuiz();
  tally()
}

$(main);