'use strict';

const body = document.querySelector('body');
const books = document.querySelector('.books');
let remove = document.querySelectorAll('.remove');
const formContainer = document.querySelector('.form-pop-up');
const form = document.querySelector('.form-pop-up form');
const formSubmit = document.querySelector('.form-pop-up form button');
const addBookBtn = document.querySelector('.btn');
let statusCheck = document.querySelectorAll('.status input');

const myLibrary = [];

function Book(title, author, numOfPages, status, img) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.status = status;
    this.img = img;
};

function addBookToLibrary(title, author, numOfPages, status, img) {
    let check = `unchecked="`;
    if (status === "off") {
        status = 'Not Finished';
    } else {
        status = 'Finished';
        check = `checked="true`;
    };

    let index = myLibrary.length;
    let newBook = `
    <div class="book" data-attribute="${index}">
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
                <label>${status}</label>
                <input type="checkbox" id="status" name="status" ${check}">
            </div>
        </div>
        <img class="remove" src="./icons/exit.png" alt="remove">
    </div>`;

    books.innerHTML += newBook;
    myLibrary.push(new Book(title, author, numOfPages, status, img));

    removeButtonEvent();
    statusButtonEvent();
};

function removeButtonEvent() {
    remove = document.querySelectorAll('.remove');

    remove.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.parentElement === form) {
                formContainer.style.display = 'none';
                body.style.overflow = 'auto';
            } else {
                let index = e.target.parentElement.dataset.attribute;
                
                delete myLibrary[index];
                e.target.parentElement.remove();
            };
        });
    });
};

function statusButtonEvent() {
    statusCheck = document.querySelectorAll('.status input');

    statusCheck.forEach(check => {

        check.addEventListener('click', () => {
            let index = check.offsetParent.dataset.attribute;

            if (check.attributes[3].nodeValue === 'true'){
                check.attributes[3].nodeValue = 'false';
                check.previousElementSibling.innerText = 'Not Finished';
                myLibrary[index].status = 'Not Finished';
            } else {
                check.attributes[3].nodeValue = 'true';
                check.previousElementSibling.innerText = 'Finished';
                myLibrary[index].status = 'Finished';
            };
        });
    });
};

// test examples
addBookToLibrary('Harry Potter', 'jkr', 999, "off", './example-covers/half-blood-prince.webp');
addBookToLibrary('Captain Underpants', 'nobody', 0, "on", './example-covers/captain-underpants.webp');
addBookToLibrary('Geronimo Stilton', 'everyone', 39847, "off", './example-covers/geronimo-stilton.webp');
addBookToLibrary('The Cat in the Hat', 'seuss', 389, "on", './example-covers/cat-in-hat.webp');

addBookBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
    body.style.overflow = 'hidden';
});

formSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    let title = e.target.parentElement[0].value;
    let author = e.target.parentElement[1].value;
    let numOfPages = e.target.parentElement[2].value;
    let status = e.target.parentElement[3].value;
    let img = URL.createObjectURL(e.target.parentElement[4].files[0]);

    formContainer.style.display = 'none';
    body.style.overflow = 'auto';

    addBookToLibrary(title, author, numOfPages, status, img);
});