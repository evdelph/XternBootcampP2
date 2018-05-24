const App = {
  init(selectors) {
    this.albums = []

    if(localStorage.getItem("album")!=null){
      this.albums =  JSON.parse(localStorage.getItem("album"))
    }
    this.number = 0
    this.albumlist = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', ev => {
        ev.preventDefault()
        this.handleSubmit(ev)
      })

      this.loadData(this.albums)
    },

  loadData(album){
    if(localStorage.getItem("album")!=null){

      for(items in album){
        const listItem = this.renderListItem(album[items])
        this.albumlist.insertBefore(listItem, this.albumlist.firstElementChild)
      }
    }
  },

  saveData(){
    localStorage.setItem("album", JSON.stringify(this.albums))
  },


  renderListItem(album) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = album.id
   
  const nameSpan = item
      .querySelector('.albumName')
  
   nameSpan.textContent = album.name
   nameSpan.addEventListener('keypress',this.saveOnEnter.bind(this,album))

    item
      .querySelector('button#del')
      .addEventListener('click', this.deleteItem.bind(this,album))
        

    item
      .querySelector('button#fav')
      .addEventListener('click', this.favItem.bind(this,album))
        

    item
      .querySelector('button#up')
      .addEventListener('click',this.moveUp.bind(this,album))
        

    item
      .querySelector('button#down')
      .addEventListener('click',this.moveDown.bind(this,album))
      

    item
      .querySelector('button#change')
      .addEventListener('click', this.changeContent.bind(this,album))
    

    return item
  },

  handleSubmit(ev) {
    const f = ev.target
    const album = {
      id: ++this.number,
      name: f.albumName.value,
      fav: false,
    }

    this.addAlbum(album)
    
    f.reset()
    f.albumName.focus()
  },

  addAlbum(album){
    this.albums.unshift(album)
    this.saveData()

    const item = this.renderListItem(album)
    this.albumlist.insertBefore(item, this.albumlist.firstElementChild)
    
  },
  deleteItem(album,ev){
     console.log('delete')
     const item = ev.target.closest('.album')
     item.remove()
 
     const i = this.albums.indexOf(album)
     this.albums.splice(i, 1)
     this.saveData()
     
  },

  favItem(album,ev){
    const item = ev.target.closest('.album')
    album.fav = item.classList.toggle('fav')
    this.saveData()
    
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
      this.saveData()
      
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
      this.saveData()
    } catch {
      null
    }
  },
  changeContent(album, ev){
    const selectedItem = ev.target.closest('.album')
    const button = document.querySelector('button#change')
    const nameField = selectedItem.querySelector('.albumName')

    if(nameField.isContentEditable==false){
      nameField.setAttribute('contentEditable',true)
      button.classList = 'success button'
      nameField.focus()
      
    } else {
      nameField.setAttribute('contentEditable',false)
      button.classList = 'primary button'
      album.name = nameField.textContent
      this.saveData()
    }
  },

  saveOnEnter(album,ev){
    if(ev.key==='Enter'){
      this.changeContent(album,ev)
    }
  }
  
}

App.init({
  formSelector: '#albumForm',
  listSelector: '#albumList',
  templateSelector: '.album.template',
})