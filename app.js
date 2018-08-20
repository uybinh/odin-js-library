function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function(){
  let info = `${this.title} by ${this.author}, ${this.pages} pages, `
  info += (this.read ? 'have read.' : 'not read yet.')
  return info
}

let render = function(library){
  let tbody = document.querySelector('#library tbody')
  tbody.innerHTML = renderBooks(library)
  addRemoveEvents()
}

let renderFromStorage = function(){
  render(getLibrary())
}
let addRemoveEvents = function(){
  let bookButtons = document.querySelectorAll('tbody button')
  bookButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      removeBook(event)
    })
  })
}

let renderBook = function(book, index){
  let bookstring = `
    <tr data-book-index='${index}'>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td>
        <button class="btn btn-sm btn-primary">Remove</button>
      </td>
    </tr>
  `
  return bookstring
}

let renderBooks = function(library){
  let books = ''
  library.forEach((book, index) => {
    books += renderBook(book, index)
  })
  return books
}

let newBookForm = function() {
  return `
<div class="form-group">
  <label for="title">Name</label>
  <input type="text" id="title" name="title" class="form-control">
</div>
<div class="form-group">
  <label for="author">Author</label>
  <input type="text" id="author" name="author" class="form-control">
</div>
<div class="form-group">
  <label for="pages">Number of pages</label>
  <input type="number" id="pages" name="pages" class="form-control">
</div>
<div class="form-group form-check"">
  <input type="checkbox" id="read" name="read" class="form-check-input">
  <label for="read">Status (Read/Unread)</label>
</div>
<button id="submit-btn" class="btn btn-primary">Submit</button>
`
}

let createForm = function() {
  if (document.querySelector('form')) {
    return
  }
  let form = document.createElement('form')
  form.innerHTML = newBookForm();
  appendChildTo('.container', form)
  document.querySelector('#submit-btn').addEventListener('click',(event) => {
    event.preventDefault()
    let formData = new FormData(document.querySelector('form'))
    let myLibrary = getLibrary()
    myLibrary = addBookToLibrary(myLibrary, formData)
    render(myLibrary)
    saveToStorage(myLibrary)
    form.reset()
  })
}

let getLibrary = function(){
  return JSON.parse(localStorage.getItem('myLibrary'))
}

let addBookToLibrary = function(library, formData){
  let book = createBookObject(formData)
  library.push(book)
  return library
}

let appendChildTo = function(selector, element){
  document.querySelector(selector).appendChild(element)
}

let removeForm = function(){
  form = document.querySelector('form')
  form.parentNode.removeChild(form)
}

let createBookObject = function(formData) {
  let book = new Book();
  for(var pair of formData.entries()) {
    book[pair[0]] = pair[1]
  }
  (book.read === 'on') ? (book.read = true) : (book.read = false)
  return book
}

let removeBook = function(event){
  let myLibrary = getLibrary()
  let book = event.target.parentNode.parentNode
  book.parentNode.removeChild(book)
  myLibrary.splice(book.dataset.bookIndex,1)
  render(myLibrary)
  saveToStorage(myLibrary)
}

let saveToStorage = function(library){
  localStorage.setItem('myLibrary', JSON.stringify(library))
}

document.addEventListener('DOMContentLoaded', () => {
  renderFromStorage()
  let newBook = document.querySelector('#new-book')
  newBook.onclick = createForm
  let closeForm = document.querySelector('#close-form')
  closeForm.onclick = removeForm
})