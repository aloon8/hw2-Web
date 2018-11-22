var score = 0;
var sequenceCurrectAns = 0; 


$(document).ready(function () {
    $("#startButton").click(function () {
        generateNewQuestion();
    })
})

$(document).ready(function () {
    $("#finishButton").click(function () {
        alert("You are finished the game!!! you collect " + score + " points")
        score = 0;
        sequenceCurrectAns = 0;
        $("#question-text").empty();
        $("#answer-button").empty();
    })
})

function generateNewQuestion() {
    $("#question-text").empty();
    $("#answer-button").empty();
    let category = $("#Category").val();
    let type = $("#Type").val();
    var newUrl = "https://opentdb.com/api.php?amount=1";

    if (category != "any") {
        newUrl = newUrl + "&category=" + category;
    }

    if (sequenceCurrectAns < 5) {
        newUrl = newUrl + "&difficulty=easy"
    } else if (sequenceCurrectAns >= 5 || sequenceCurrectAns < 10) {
        newUrl = newUrl + "&difficulty=medium"
    } else {
        newUrl = newUrl + "&difficulty=hard"
    }

    if (type == "any") {
        let i = Math.floor(Math.random() * 2);
        if (i == 0) {
            type = "boolean";
        } else {
            type = "multiple";
        }
    } 
    newUrl = newUrl + "&type=" + type;

    $.ajax({
        url:  newUrl,
        type: 'get',
        success: function (data) {
            console.log(data);
            $("#question-text").html(data.results[0].question);
            chooseTypeAnswer(data, type);
        }
    });
}

function chooseTypeAnswer(data, type) {
    
    if (type == "boolean") {
        $("#answer-button").append('<button id="True" class="ansBtn">TRUE</button>');
        $("#answer-button").append('<button id="False" class="ansBtn">FALSE</button>');
        checkingBooleanAnswer(data);
    } else {
        var btn;
        let randomCorrect = Math.floor(Math.random() * 4);
        for (let i = 0, incorrect = 0; i < 4; i++) {
            if (i == randomCorrect) {
                btn = '<div class="w-100" style="height:20%;"><button id="correctBtn" class="ansBtn">' + data.results[0].correct_answer + '</button></div>';
            } else {
                btn = '<div class="w-100" style="height:20%;"><button class="incorrectBtn ansBtn">' + data.results[0].incorrect_answers[incorrect] + '</button></div>';
                incorrect++;
            }
            $("#answer-button").append(btn);
        }
        checkingMultipleAnswer();
    }
}

function checkingBooleanAnswer(data) {
    $(".ansBtn").click(function () {
        console.log(this.id);
        if (this.id == data.results[0].correct_answer) {
            score += 5;
            sequenceCurrectAns += 1;
            alert("Correct answer!!! \n Your score is " + score)
        } else {
            alert("Incorrect answer!!! \n Your score is " + score)
        }
        generateNewQuestion();
    });
}

function checkingMultipleAnswer() {
    $(".ansBtn").click(function () {
        if (this.id == "correctBtn") {
            score += 5;
            sequenceCurrectAns += 1;
            alert("Correct answer!!! \n Your score is " + score)
        } else {
            alert("Incorrect answer!!! \n Your score is " + score)
        } 
        $("#startButton").trigger('click');
    });
}