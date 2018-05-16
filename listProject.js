const form = document.querySelector('form#albumForm')
const list = document.querySelector('#listOutput')
albumArray = []

const addButton = document.querySelector('#submitType')
const resetButton = document.querySelector('#resetType')
const removeButton = document.querySelector('#removeType')

const addToList = function(ev)
{
    // Add list item to list
    ev.preventDefault()
    const form = ev.target

    const album = renderListItem(form.album.value)
    const albumArray = addToArray(form.album.value)
    list.appendChild(album)
    form.reset()
    form.album.focus()

}

function renderListItem(album){
    // Make individual list items
    const listItem = document.createElement('li')
    const albumList = document.createElement('ul')

    listItem.textContent = album
    albumList.appendChild(listItem)

    return albumList
}

function addToArray(element){
    albumArray.push(element)
    return albumArray
}

form.addEventListener('submit', addToList)