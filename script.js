class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  toggleRead() {
    this.read = !this.read;
  }
}
class Library {
  constructor(myLibrary) {
    this.myLibrary = myLibrary;
    this.readCount = 0;
    this.unreadCount = 0;
  }


  updateCounts() {
    this.readCount = this.myLibrary.filter(b => b.read).length;
    this.unreadCount = this.myLibrary.length - this.readCount;
    readCountDisp.textContent = "( " + this.readCount + " )";
    unreadCountDisp.textContent = "( " + this.unreadCount + " )";
  }

  createCard(book) {
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
      toggleBtn.textContent = "mark as unread?";
      card.classList.add("read");
    } else {
      toggleBtn.textContent = "mark as read?";
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
    this.updateCounts();
  }

  addBookToLibrary(title, author, pages, read) {
    let id = crypto.randomUUID();
    let newBook = new Book(title, author, pages, read, id);
    this.myLibrary.push(newBook);
    this.createCard(newBook);
  }

  removeCard(e) {
    let thisCard = e.target.parentElement.parentElement;
    let cardID = thisCard.dataset.indexNumber;
    this.myLibrary.splice(this.myLibrary.findIndex(book => book.id === cardID), 1);
    thisCard.remove();
    this.updateCounts();
  }

  toggleCard(e) {
    let thisCard = e.target.parentElement.parentElement;
    let status = thisCard.classList.contains("read");
    if (status) {
      e.target.textContent = "mark as read?";
      thisCard.classList.remove("read");
      thisCard.classList.add("unread");
    } else {
      e.target.textContent = "mark as unread?";
      thisCard.classList.remove("unread");
      thisCard.classList.add("read");
    }
    let cardID = thisCard.dataset.indexNumber;
    for (let i = 0; i < this.myLibrary.length; i++) {
      if (this.myLibrary[i].id == cardID) {
        this.myLibrary[i].toggleRead();
        break;
      }
    }
    this.updateCounts();
  }

}

const [readCountDisp, unreadCountDisp] = document.querySelectorAll(".number");

let myLib = [new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true, "1"),
new Book("To Kill a Mockingbird", "Harper Lee", 281, true, "2"),
new Book("1984", "George Orwell", 328, true, "3"),
new Book("The Catcher in the Rye", "J.D. Salinger", 214, false, "4"),
new Book("Pride and Prejudice", "Jane Austen", 279, false, "5"),
new Book("Moby-Dick", "Herman Melville", 635, false, "6"),
new Book("The Hobbit", "J.R.R. Tolkien", 310, true, "7")];

const libraryObj = new Library(myLib);
libraryObj.updateCounts();
for (let i = 0; i < myLib.length; i++) {
  libraryObj.createCard(myLib[i]);
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
  libraryObj.addBookToLibrary(title, author, pages, read);
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
    libraryObj.removeCard(e);
  } else if (e.target.classList.contains("toggle-btn")) {
    libraryObj.toggleCard(e);
  }
});





