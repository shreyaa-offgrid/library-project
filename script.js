function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

let readCount = 0;
let unreadCount = 0;
const [readCountDisp, unreadCountDisp] = document.querySelectorAll(".number");

let myLibrary = [new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true, "1"),
new Book("To Kill a Mockingbird", "Harper Lee", 281, true, "2"),
new Book("1984", "George Orwell", 328, true, "3"),
new Book("The Catcher in the Rye", "J.D. Salinger", 214, false, "4"),
new Book("Pride and Prejudice", "Jane Austen", 279, false, "5"),
new Book("Moby-Dick", "Herman Melville", 635, false, "6"),
new Book("The Hobbit", "J.R.R. Tolkien", 310, true, "7")];

for (let i = 0; i < myLibrary.length; i++) {
  createCard(myLibrary[i]);
}

function addBookToLibrary(title, author, pages, read) {
  let id = crypto.randomUUID();
  let newBook = new Book(title, author, pages, read, id);
  myLibrary.push(newBook);
  createCard(newBook);
}

function createCard(book) {
  let card = document.createElement("div");
  card.setAttribute("data-index-number", book.id);
  let bookname = document.createElement("h3");
  let authorname = document.createElement("p");
  let pagesinbook = document.createElement("p");
  let buttonDiv = document.createElement("div");
  let removeBtn = document.createElement("button");
  let toggleBtn = document.createElement("div");

  bookname.textContent = book.title;
  authorname.textContent = "By " + book.author;
  pagesinbook.textContent = book.pages + " pages";
  card.classList.add("card");
  buttonDiv.classList.add("button-div");
  removeBtn.classList.add("remove-btn");
  toggleBtn.classList.add("toggle-btn");
  removeBtn.textContent = "X";
  if (book.read) {
    toggleBtn.textContent = "Read";
    card.classList.add("read");
  } else {
    toggleBtn.textContent = "Unread";
    card.classList.add("unread");
  }

  card.appendChild(bookname);
  card.appendChild(authorname);
  card.appendChild(pagesinbook);
  buttonDiv.appendChild(toggleBtn);
  buttonDiv.appendChild(removeBtn);
  card.appendChild(buttonDiv);
  const gridcontainer = document.querySelector(".main");
  gridcontainer.appendChild(card);
  updateCounts();
}

const dialog = document.querySelector("dialog");
const openBtn = document.querySelector(".add-new-btn");
const closeBtn = document.querySelector(".form-submit");
const gridcontainer = document.querySelector(".main");

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
});

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
});

gridcontainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    removeCard(e);
  } else if (e.target.classList.contains("toggle-btn")) {
    toggleCard(e);
  }
});

function removeCard(e) {
  let thisCard = e.target.parentElement.parentElement;
  let cardID = thisCard.dataset.indexNumber;
  myLibrary = myLibrary.filter(book => book.id != cardID);
  thisCard.remove();
  updateCounts();
}

function toggleCard(e) {
  let thisCard = e.target.parentElement.parentElement;
  let status = thisCard.classList.contains("read");
  if (status) {
    e.target.textContent = "Unread";
    thisCard.classList.remove("read");
    thisCard.classList.add("unread");
  } else {
    e.target.textContent = "Read";
    thisCard.classList.remove("unread");
    thisCard.classList.add("read");
  }
  let cardID = thisCard.dataset.indexNumber;
  for(let i = 0;i<myLibrary.length;i++){
    if(myLibrary[i].id==cardID){
      myLibrary[i].read = (myLibrary[i].read)?false:true;
      break;
    }
  }
  updateCounts();
}

function updateCounts(){
  readCount = myLibrary.filter(b => b.read).length;
  unreadCount = myLibrary.length - readCount;
  readCountDisp.textContent = "( "+readCount+" )";
  unreadCountDisp.textContent = "( "+unreadCount+" )";
}



