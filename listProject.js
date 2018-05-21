const app = {
  init(selectors) {
    this.albums = []
    this.number = 0
    this.albumlist = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', ev => {
        ev.preventDefault()
        this.handleSubmit(ev)
      })
  },

  renderListItem(album) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = album.id
    item
      .querySelector('.albumName')
      .textContent = album.name

    item
      .querySelector('button#del')
      .addEventListener('click',this.deleteItem.bind(this,album))

    item
      .querySelector('button#fav')
      .addEventListener('click',this.favItem.bind(this,album))

    item
      .querySelector('button#up')
      .addEventListener('click',this.moveUp.bind(this,album))

    item
      .querySelector('button#down')
      .addEventListener('click',this.moveDown.bind(this,album))

    item
      .querySelector('button#change')
      .addEventListener('click', this.changeContent.bind(this,album,item))
    

    return item
  },

  handleSubmit(ev) {
    const f = ev.target
    const album = {
      id: ++this.number,
      name: f.albumName.value,
      fav: false,
    }

    this.albums.unshift(album)

    const item = this.renderListItem(album)
    this.albumlist.insertBefore(item, this.albumlist.firstElementChild)
    
    f.reset()
    f.albumName.focus()
  },

  deleteItem(album,ev){
     // remove from the DOM
     const item = ev.target.closest('.album')
     item.remove()
 
     // remove from the array
     const i = this.albums.indexOf(album)
     this.albums.splice(i, 1)
  },

  favItem(element,ev){
    const button = ev.target
    const y = button.closest('.album')
    const index = app.albums.indexOf(element)

    if(app.albums[index]['fav']==false){
      y.style.borderColor='cornflowerblue'
      app.albums[index]['fav']=true
    } else {
      y.style.borderColor='grey'
      app.albums[index]['fav']=false
    }
  },

  moveUp(element,ev){
    const selectedItem = document.querySelector(`[data-id="${element.id}"]`)
    const siblingItem = selectedItem.previousElementSibling
    const selectedIndex = app.albums.indexOf(element)
     
    try{
      const data = siblingItem.dataset
      this.albumlist.insertBefore(selectedItem, selectedItem.previousElementSibling)
      const holder = app.albums[selectedIndex]
      app.albums[selectedIndex] = app.albums[selectedIndex-1]
      app.albums[selectedIndex-1] = holder
    } catch {
      null
    }
  },

  moveDown(element,ev){
    const selectedItem = document.querySelector(`[data-id="${element.id}"]`)
    const siblingItem = selectedItem.nextElementSibling
    const selectedIndex = app.albums.indexOf(element)
    try{
      const data = siblingItem.dataset
      this.albumlist.insertBefore(selectedItem.nextElementSibling,selectedItem)
      const holder = app.albums[selectedIndex]
      app.albums[selectedIndex] = app.albums[selectedIndex+1]
      app.albums[selectedIndex+1] = holder
    } catch {
      null
    }
  },
  changeContent(album, item, ev){
    const selectedItem = item.querySelector('.albumName')
    const button = ev.target

    if(selectedItem.isContentEditable==false){
      selectedItem.setAttribute('contentEditable',true)
      button.classList = 'success button'
      button.style.backgroundImage = "url(https://d30y9cdsu7xlg0.cloudfront.net/png/1732217-200.png)"
      selectedItem.focus()
      
      
    } else {
      selectedItem.setAttribute('contentEditable',false)
      button.classList = 'primary button'
      button.style.backgroundImage = "url(https://d30y9cdsu7xlg0.cloudfront.net/png/1635223-200.png)"
      album.name = selectedItem.textContent
    }
  }
}

app.init({
  formSelector: '#albumForm',
  listSelector: '#albumList',
  templateSelector: '.album.template',
})