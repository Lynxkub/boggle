function clearGuess(){
  $(".guess").val("")
  
}

function removeGuessBox(){
  $("#guessBox").remove();
}

function displayFinalScore(){

  $("#gameData").replaceWith(`<h2>Your Score: ${startingScore}</h2>`)
}

startingScore=0
function updateScore(){
  let points=$(".guess").val().length
  startingScore+=points;
  $("#score").empty();
  $("#score").append(startingScore)
 
}
let startingTime=60;
const timerCountDown= setInterval(function(){
  startingTime-=1
  $("#timer").empty();
  $("#timer").append(startingTime);
}, 1000)

setTimeout(function(){
  clearInterval(timerCountDown);
  removeGuessBox();
  displayFinalScore();
}, 60001)

async function compareGuess(e){
  e.preventDefault()
  let $guess=$(".guess").val();
  let resp = await axios.get("/guess_page", {params:{guess:$guess}});
  console.log(resp)
  if (resp.data.result !== "ok"){
    $(".guesses").prepend(`<p>${$guess} is not a correct word!</p>`)
  }else{
    $(".guesses").append(`<li>${$guess}</li>`)
    updateScore();
  }
  clearGuess();

}

$(".guess_form").on("submit", compareGuess)

async function sendScore(){
  let score=startingScore;

  let data=await axios.post("/score_page", {score:score})
  console.log(data);
  if (data.data.new_record){
    $("#guessBox").append(`<h2>New Record : ${startingScore}</h2>`)
  }else{
    $("#guessBox").append(`<h2>Final Score: ${startingScore}</h2>`)
  }
  
}