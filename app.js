'use strict';

const myLibrary = [];

function Book(title, author, numOfPages, read) {
    // the constructor...

    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
};

function addBookToLibrary(title, author, numOfPages, read) {
    // do stuff..

    myLibrary.push(new Book(title, author, numOfPages, read))
};


// test examples
addBookToLibrary('harrypotter', 'jkr', 999, false);
addBookToLibrary('fakebook', 'nobody', 0, true);

console.log(myLibrary);

