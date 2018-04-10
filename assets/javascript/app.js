var questions = [
    {
        question: 'how many inches are in a foot?',
        answers: {
            a: 13,
            b: 1,
            c: 12
        },
        correctAnswer: 'c'
    },
    {
        question: 'what color is grass?',
        answers: {
            a: 'red',
            b: 'green',
            c: 'blue'
        },
        correctAnswer: 'b'
    },
    {
        question: 'how many feet do cats have?',
        answers: {
            a: 4,
            b: 2,
            c: 5
        },
        correctAnswer: 'a'
    }
]
var currentQuestion = 0;
var correct = 0;
var incorrect = 0;
var notAnswered = 0;


$('#result-page').hide();
$('.btn-restart').hide();



function run() {
    var timer = 30;

    //setting quiz page
    $('.question').text(questions[currentQuestion].question);
    $('.btn-start').hide();
    $('#start-page').show();
    $('#result-page').hide();
    $('.btn-restart').hide();
    $('#timer-label').text('Time Left: ');
    $('#timer').text(30);


    var countdown = setInterval(function() {
        timer--;
        $('#timer').text(timer);
        
        if (timer === 0) {

            clearInterval(countdown);
            nextPage();
        }
    }, 1000)


    //adding questions to page
    for (var i = 0; i < questions.length; i++) {
        $('#answer-a').html('<input type="radio" class="answers" name="answer" value="a"> a: ' + questions[currentQuestion].answers.a)
        $('#answer-b').html('<input type="radio" class="answers" name="answer" value="b"> b: ' + questions[currentQuestion].answers.b)
        $('#answer-c').html('<input type="radio" class="answers" name="answer" value="c"> c: ' + questions[currentQuestion].answers.c)
    }

    //going to next page when button is clicked
    $(".answers").off().on('click', function () {
        clearInterval(countdown);
        nextPage();
    })




}
//running game after start button is pressed
$('#start-page').off().on('click', '.btn-start', function () {
    run()

})
//showing if question is right or wrong
function nextPage() {
    console.log($('input[name=answer]:checked', '#quiz-form').val());
    console.log(questions[currentQuestion].correctAnswer);
    
    //hiding question page, showing result page
    $('#start-page').hide();
    $('#result-page').show();

    //if answer is right or wrong
    if ($('input[name=answer]:checked', '#quiz-form').val() === questions[currentQuestion].correctAnswer) {
        $('#result').text("correct!");
        correct++;
    } else if ($('input[name=answer]:checked', '#quiz-form').val() === undefined) {
        $('#result').text("Out of Time!");
        notAnswered++;
    
    }else {
        $('#result').text("incorrect!");
        incorrect++;
    }
    //runs new question after 5 seconds
    setTimeout(function () {
        if (currentQuestion < questions.length) {
            run();
        }else {
            results();
        }
    }, 500)
    currentQuestion++;
    console.log(currentQuestion);

}
function results() {
    $('#result').text("Results");
    $('#correct').text("Correct: " + correct);
    $('#incorrect').text("Incorrect: " + incorrect);
    $('#not-answered').text("Not Answered: " + notAnswered);
    $('.btn-restart').show();


    $('.btn-restart').on('click', function() {
        correct = 0;
        incorrect = 0;
        currentQuestion = 0;
        $('#correct').text("");
        $('#incorrect').text("");
        $('#not-answered').text("");

        run();
    })

}

