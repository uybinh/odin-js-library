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

document.addEventListener('DOMContentLoaded', () => {
  render(myLibrary)
})