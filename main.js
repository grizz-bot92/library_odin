const addBookButton = document.getElementById('show-form');
const submitBook = document.getElementById('submit');
const form = document.querySelector("[data-modal]");
const booksContainer = document.querySelector(".books");
const images = ['images/green_book.png', 'images/red_book.png', 'images/book.png'];


const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayBooks();
}

function displayBooks() {
    booksContainer.innerHTML = '';  
    myLibrary.forEach(book => {

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const bookImage = document.createElement('img');
        const randomBook = images[Math.floor(Math.random() * images.length)];
        bookImage.src = randomBook;
        bookImage.height = 300;

        const titleOverlay = document.createElement('div');
        titleOverlay.classList.add('book-title');
        titleOverlay.textContent = book.title;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash-can','fa-2x');

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = `
            <strong>Title: </strong> ${book.title}<br>
            <strong>Author: </strong> ${book.author}<br>
            <strong>Pages: </strong> ${book.pages}<br>
            <strong>Read: </strong> ${book.read}<br>
            `;
        
            bookDiv.addEventListener('mouseover', () =>{
                tooltip.style.visibility = 'visible';
            });

            bookDiv.addEventListener('mouseout', () =>{
                tooltip.style.visibility = 'hidden';
            });
        
        deleteButton.appendChild(icon);

        deleteButton.addEventListener('click', (index) =>{
            myLibrary.splice(index, 1);
            displayBooks();
            
        });


        bookDiv.appendChild(bookImage);
        bookDiv.appendChild(titleOverlay);
        bookDiv.appendChild(tooltip);
        bookDiv.appendChild(deleteButton);

        booksContainer.appendChild(bookDiv);
    });
};  


addBookButton.addEventListener("click", () =>{
    form.showModal()
    
});

submitBook.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    form.close();

    e.target.form.reset();
});






