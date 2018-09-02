function Book(bookinfo) {
  this.title = bookinfo.title
  this.author = bookinfo.author
  this.pages = parseInt(bookinfo.pages, 10)
  this.read = bookinfo.read
}

Book.prototype = {
  constructor: Book,
  info() {
    let info = `${this.title} by ${this.author}, ${this.pages} pages, `
    info += this.read ? "have read." : "not read yet."
    return info
  },
  toggle(property) {
    if (typeof this[property] === "boolean") {
      this[property] = !this[property]
    }
    return this[property]
  }
}

let render = function(library) {
  let tbody = document.querySelector("#library tbody")
  tbody.innerHTML = renderBooks(library)
  addRemoveEvents()
  addBookStatusToggleEvents()
}

let renderFromStorage = function() {
  render(getLibraryFromStorage())
}

let addRemoveEvents = function() {
  let bookButtons = document.querySelectorAll("tbody button")
  bookButtons.forEach(button => {
    let index = button.dataset.bookIndex
    button.onclick = function() {
      removeBookWithIndex(index)
    }
  })
}

let addBookStatusToggleEvents = function() {
  let statusAnchors = document.querySelectorAll(".read-status")
  let library = getLibraryFromStorage()
  statusAnchors.forEach(a => {
    let index = a.dataset.bookIndex
    let book = library[index]
    a.addEventListener("click", function(event) {
      event.preventDefault()
      book.toggle("read")
      saveLibraryToStorage(library)
      render(library)
    })
  })
}

let renderBook = function(book, index) {
  let status = book.read ? "Have read" : "Not read yet"
  let bookstring = `
    <tr data-book-index='${index}'>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <a href='' class='read-status' data-book-index='${index}'>
          ${status}
        </a>
      </td>
      <td>
        <button class="btn btn-sm btn-primary" data-book-index='${index}'>
          Remove
        </button>
      </td>
    </tr>
  `
  return bookstring
}

let renderBooks = function(library) {
  let books = ""
  library.forEach((book, index) => {
    books += renderBook(book, index)
  })
  return books
}

let newBookForm = function() {
  return `
<div class="form-group">
  <label for="title">Title</label>
  <input type="text" id="title" name="title" class="form-control" required>
</div>
<div class="form-group">
  <label for="author">Author</label>
  <input type="text" id="author" name="author" class="form-control" required>
</div>
<div class="form-group">
  <label for="pages">Number of pages</label>
  <input type="number" id="pages" name="pages" class="form-control" required>
</div>
<div class="form-group form-check"">
  <input type="checkbox" id="read" name="read" class="form-check-input">
  <label for="read">Status (Read/Unread)</label>
</div>
<button id="submit-btn" class="btn btn-sm btn-primary">Submit</button>
`
}

let createForm = function() {
  if (document.querySelector("form")) {
    return
  }
  let form = document.createElement("form")
  form.name = "myForm"
  form.innerHTML = newBookForm()
  appendChildTo(".container", form)
  document.querySelector("#submit-btn").addEventListener("click", event => {
    // if (validateForm(form)) {
    //   submitForm()
    // }
    // form.reset()
  })
  form.addEventListener("submit", event => {
    submitForm()
    event.preventDefault()
  })
}

let submitForm = function() {
  let formData = new FormData(document.querySelector("form"))
  let myLibrary = getLibraryFromStorage()
  myLibrary = addBookToLibrary(myLibrary, formData)
  saveLibraryToStorage(myLibrary)
  renderFromStorage()
}

let validateForm = function(form) {
  let formData = new FormData(form)
  let keys = ["title", "author", "pages"]
  let messages = ""
  keys.forEach(key => {
    if (!(typeof formData.get(key) === "string" && formData.get(key) != "")) {
      messages += `Please enter ${key}!\n`
    }
  })
  if (messages.length > 0) {
    alert(messages.trim())
    return false
  } else {
    return true
  }
}
let removeForm = function() {
  form = document.querySelector("form")
  form.parentNode.removeChild(form)
}

let createBookObject = function(formData) {
  let book = new Book(getBookFromFormData(formData))
  book.read === "on" ? (book.read = true) : (book.read = false)
  return book
}

let addBookToLibrary = function(library, formData) {
  let book = createBookObject(formData)
  library.push(book)
  return library
}

let removeBookWithIndex = function(index) {
  let myLibrary = getLibraryFromStorage()
  let book = document.querySelector(`tr[data-book-index='${index}']`)
  book.parentNode.removeChild(book)
  myLibrary.splice(index, 1)
  saveLibraryToStorage(myLibrary)
  renderFromStorage()
}

let getBookFromFormData = function(formData) {
  let bookData = {}
  for (let pair of formData.entries()) {
    bookData[pair[0]] = pair[1]
  }
  return bookData
}

let getLibraryFromStorage = function() {
  if (localStorage.getItem("myLibrary") === null) {
    return []
  }
  rawLibrary = JSON.parse(localStorage.getItem("myLibrary"))
  return rawLibrary.map(book => {
    return new Book(book)
  })
}

let saveLibraryToStorage = function(library) {
  localStorage.setItem("myLibrary", JSON.stringify(library))
}

let appendChildTo = function(selector, element) {
  document.querySelector(selector).appendChild(element)
}

document.addEventListener("DOMContentLoaded", () => {
  renderFromStorage()
  let newBook = document.querySelector("#new-book")
  newBook.onclick = createForm
  let closeForm = document.querySelector("#close-form")
  closeForm.onclick = removeForm
})
