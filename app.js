'use strict';

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
addBookToLibrary('harrypotter', 'jkr', 999, false);
addBookToLibrary('fakebook', 'nobody', 0, true);

function DisplayBooks(arr) {
    for (let i = 0; i < arr.length; i++){
        console.log(arr[i]);
    };
};

DisplayBooks(myLibrary);
