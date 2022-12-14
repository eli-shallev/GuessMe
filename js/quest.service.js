'use strict'
const STORAGE_KEY = 'questDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }
    gCurrQuest = gQuestsTree
    gPrevQuest = null
    saveToStorage(STORAGE_KEY,gQuestsTree)
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // Done: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = res === 'yes' ? gCurrQuest.yes : gCurrQuest.no
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree

  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  if (lastRes === 'yes') gPrevQuest.yes = newQuest
  if (lastRes === 'no') gPrevQuest.no = newQuest
  resetCurrQuest()
  saveToStorage(STORAGE_KEY,gQuestsTree)

}

function getCurrQuest() {
  return gCurrQuest
}

function resetCurrQuest(){
  gCurrQuest = gQuestsTree
}
