const form = document.querySelector('form#albumForm')
const list = document.querySelector('#listOutput')

albumArray = []

const addButton = document.querySelector('#submitType')
const resetButton = document.querySelector('#resetType')

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

    const removeButton = document.createElement("button")
    removeButton.classList.add('removeButton')

    listItem.appendChild(removeButton)
    albumList.appendChild(listItem)
    removeButton.addEventListener('click',list => { albumList.removeChild(listItem)})
    
    return albumList
}



function addToArray(element){
    //Add element to array
    albumArray.push(element)
    return albumArray
}

function refreshPage(){
    location.reload()
}


form.addEventListener('submit', addToList)
resetButton.addEventListener('click',refreshPage)
