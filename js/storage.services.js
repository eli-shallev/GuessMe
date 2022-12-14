'use strict'

function saveToStorage(key, val) {
    console.log('saving...')
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    console.log('loading...')
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}