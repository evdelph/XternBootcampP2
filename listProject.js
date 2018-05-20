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
      .querySelector('.albumName')
      .addEventListener('change', this.changeContent.bind(this,album))

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
  },

  deleteItem(element,ev){
    const button = ev.target
    const x = button.closest('.album')

    x.remove()
    const index = this.albums.indexOf(element)
    this.element.splice(index,1)
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

  changeContent(element,ev){
    const selectedItem = document.querySelector(`[data-id="${element.id}"]`)
    console.log(selectedItem)
    const selectedIndex = app.albums.indexOf(element)
    const selectedValue = selectedItem.textContent
    console.log(albums[selectedIndex])
    console.log(selectedValue)

    app.albums[selectedIndex] = selectedValue
  }
}

app.init({
  formSelector: '#albumForm',
  listSelector: '#albumList',
  templateSelector: '.album.template',
})
