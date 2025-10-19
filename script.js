function Book(title,author,pages,read,id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

const myLibrary = [];

function addBookToLibrary(title,author,pages,read) {
  // take params, create a book then store it in the array
  let id =  crypto.randomUUID();
  let newBook = new Book(title,author,pages,read,id);
  myLibrary.push(newBook); 
  createCard(newBook);
}

function createCard(book){
  let card = document.createElement("div");
  let bookname = document.createElement("h3");
  let authorname = document.createElement("p");
  let pagesinbook = document.createElement("p");
  bookname.textContent = book.title;
  authorname.textContent = "By "+book.author;
  pagesinbook.textContent = book.pages;
  card.classList.add("card");
  if(book.read){
    card.classList.add("read");
  }else{
    card.classList.add("unread");
  }
  card.appendChild(bookname);
  card.appendChild(authorname);
  card.appendChild(pagesinbook);
  const gridcontainer = document.querySelector(".main");
  gridcontainer.appendChild(card);
}



