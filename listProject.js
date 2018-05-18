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

    y.style.borderColor='cornflowerblue'
    app.albums[index]['fav']=true
  }
}

app.init({
  formSelector: '#albumForm',
  listSelector: '#albumList',
  templateSelector: '.album.template',
})
