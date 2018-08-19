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
  library.forEach((book) => {
    renderBook(book)
  })
}

let renderBook = function(book){
  let body = document.querySelector('#library tbody')
  let bookElement = document.createElement('tr')
  bookElement.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
  `
  body.appendChild(bookElement)
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
  <label for="pages">Pages</label>
  <input type="number" id="pages" name="pages">
  <br>
  <label for="status">Status</label>
  <input type="checkbox" id="status" name="status">
  <br>
  <button>Submit</button>
  `
  document.querySelector('body').appendChild(form)
}

document.addEventListener('DOMContentLoaded', () => {
  render(myLibrary)
  let button = document.querySelector('button')
  button.onclick = createForm
})