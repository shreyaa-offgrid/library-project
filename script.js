function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

const myLibrary = [];
const readCount = 0;

function addBookToLibrary(title, author, pages, read) {
  let id = crypto.randomUUID();
  let newBook = new Book(title, author, pages, read, id);
  myLibrary.push(newBook);
  createCard(newBook);
}

function createCard(book) {
  let card = document.createElement("div");
  let bookname = document.createElement("h3");
  let authorname = document.createElement("p");
  let pagesinbook = document.createElement("p");
  bookname.textContent = book.title;
  authorname.textContent = "By " + book.author;
  pagesinbook.textContent = book.pages;
  card.classList.add("card");
  if (book.read) {
    card.classList.add("read");
    readCount++;
  } else {
    card.classList.add("unread");
  }
  
  card.appendChild(bookname);
  card.appendChild(authorname);
  card.appendChild(pagesinbook);
  const gridcontainer = document.querySelector(".main");
  gridcontainer.appendChild(card);
}

const dialog = document.querySelector("dialog");
const openBtn = document.querySelector(".add-new-btn");
const closeBtn = document.querySelector(".form-submit");

openBtn.addEventListener("click", function () {
  dialog.showModal();
});
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  dialog.close();
  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("author-name").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.querySelector(".read-status>input").checked;
  addBookToLibrary(title, author, pages, read);
  const form = document.querySelector("form");
  form.reset();
})

dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})



