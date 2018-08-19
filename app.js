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

let firstBook = new Book('Harry Potter', 'J.R.R. Tolkien', 235, false)
let secondBOok = new Book('Angel & Demon', 'Dan Brown', 534, false)
let myLibrary = [firstBook, secondBOok]


let render = function(library){
  let tbody = document.querySelector('#library tbody')
  tbody.innerHTML = renderBooks(library)
  addRemoveEvents()
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
        <button>Remove</button>
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

let createForm = function() {
  if (document.querySelector('form')) {
    return
  }

  let form = document.createElement('form')
  form.innerHTML = `
  <label for="title">Name</label>
  <input type="text" id="title" name="title">
  <br>
  <label for="author">Author</label>
  <input type="text" id="author" name="author">
  <br>
  <label for="pages">Number of pages</label>
  <input type="number" id="pages" name="pages">
  <br>
  <label for="status">Status</label>
  <input type="checkbox" id="status" name="status">
  <br>
  <button>Submit</button>
  `
  document.querySelector('body').appendChild(form)
}

let removeBook = function(event){
  let book = event.target.parentNode.parentNode
  book.parentNode.removeChild(book)
  myLibrary.splice(book.dataset.bookIndex,1)
  render(myLibrary)
  console.log(myLibrary)
}

document.addEventListener('DOMContentLoaded', () => {
  render(myLibrary)
  let button = document.querySelector('#newbook')
  button.onclick = createForm
})