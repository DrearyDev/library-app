'use strict';

const books = document.querySelector('.books');
let remove = document.querySelectorAll('.remove');

const myLibrary = [];

function Book(title, author, numOfPages, read, img) {
    // the constructor...

    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
    this.img = img;
};

function addBookToLibrary(title, author, numOfPages, read, img) {
    // do stuff..

    myLibrary.push(new Book(title, author, numOfPages, read, img))
};


// test examples
addBookToLibrary('notharrypotter', 'jkr', 999, false, './example-covers/half-blood-prince.webp');
addBookToLibrary('fakebook', 'nobody', 0, true, './example-covers/half-blood-prince.webp');
addBookToLibrary('realfakebook', 'everyone', 39847, false, './example-covers/half-blood-prince.webp');
addBookToLibrary('catinhat', 'seuss', 389, true, './example-covers/half-blood-prince.webp');

function DisplayBooks(arr) {
    for (let i = 0; i < arr.length; i++){

        let newBook = `
        <div class="book">
            <h1>${arr[i].title}</h1>
            <img class="cover" src="${arr[i].img}">
            <div class="information">
                <div class="author">
                    <p>Author:</p>
                    <p>${arr[i].author}</p>
                </div>
                <div class="pages">
                    <p># of pages:</p>
                    <p>${arr[i].numOfPages}</p>
                </div>
                <div class="status">
                    <p>Status:</p>
                    <p>${arr[i].read}</p>
                </div>
            </div>
            <img class="remove" src="./icons/exit.png">
        </div>`;

        books.innerHTML += newBook;
    };
    remove = document.querySelectorAll('.remove');
};
DisplayBooks(myLibrary);

remove.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.offsetParent);
        e.target.offsetParent.style.display = 'none';
    });
});
