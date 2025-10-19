const myLibrary = [];

function Book(title,author,pages,read,id) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(title,author,pages,read) {
  // take params, create a book then store it in the array
  let id =  crypto.randomUUID();
  let newBook = new Book(title,author,pages,read,id);
  myLibrary.push(newBook); 
}

function displayBooks(){
    myLibrary.forEach(function(book){
        let book = document.createElement("p");
        book.textContent = book.title;
    })
}
