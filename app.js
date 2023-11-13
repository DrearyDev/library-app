'use strict';

const body = document.querySelector('body');
const books = document.querySelector('.books');
let remove = document.querySelectorAll('.remove');
const formContainer = document.querySelector('.form-pop-up');
const form = document.querySelector('.form-pop-up form');
const formSubmit = document.querySelector('.form-pop-up form button');
const addBookBtn = document.querySelector('.btn');

const myLibrary = [];

function Book(title, author, numOfPages, status, img) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.status = status;
    this.img = img;
};

function addBookToLibrary(title, author, numOfPages, status, img) {
    if (status === "off") {
        status = 'not finished';
    } else {
        status = 'finished';
    };

    let newBook = `
    <div class="book">
        <h1>${title}</h1>
        <img class="cover" src="${img}">
        <div class="information">
            <div class="author">
                <p>Author:</p>
                <p>${author}</p>
            </div>
            <div class="pages">
                <p># of pages:</p>
                <p>${numOfPages}</p>
            </div>
            <div class="status">
                <p>Status:</p>
                <p>${status}</p>
            </div>
        </div>
        <img class="remove" src="./icons/exit.png" alt="remove">
    </div>`;

    books.innerHTML += newBook;
    myLibrary.push(new Book(title, author, numOfPages, status, img));

    remove = document.querySelectorAll('.remove');

    remove.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.offsetParent === form) {
                formContainer.style.display = 'none';
                body.style.overflow = 'auto';
            } else {
                e.target.offsetParent.style.display = 'none';
            };
        });
    });
};

// test examples
addBookToLibrary('notharrypotter', 'jkr', 999, "off", './example-covers/half-blood-prince.webp');
addBookToLibrary('fakebook', 'nobody', 0, "on", './example-covers/half-blood-prince.webp');
addBookToLibrary('realfakebook', 'everyone', 39847, "off", './example-covers/half-blood-prince.webp');
addBookToLibrary('catinhat', 'seuss', 389, "on", './example-covers/half-blood-prince.webp');

addBookBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
    body.style.overflow = 'hidden';
});

console.log(remove);

formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(remove);

    let title = e.target.offsetParent[0].value;
    let author = e.target.offsetParent[1].value;
    let numOfPages = e.target.offsetParent[2].value;
    let status = e.target.offsetParent[3].value;
    let img = URL.createObjectURL(e.target.offsetParent[4].files[0]);

    formContainer.style.display = 'none';
    body.style.overflow = 'auto';

    addBookToLibrary(title, author, numOfPages, status, img);
});