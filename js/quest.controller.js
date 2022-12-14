'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-start-over').click(onStartOver)


function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // DOne: hide the game-start section
  $('.game-start').hide()

  renderQuest()
  // Done: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // Done: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest').hide()
      $('.success').show()
      // TODO: improve UX
    } else {
      // Done: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // Done: update the lastRes global var
    gLastRes=res
    moveToNextQuest(res)
    renderQuest()
    console.log(res)
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // TODO: Get the inputs' values
  // Done: Call the service addGuess
  addGuess(newQuest,newGuess,gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
}

function onStartOver(){
  $('.success').hide()
  $('.game-start').show()
  gLastRes = null
  resetCurrQuest()
}
