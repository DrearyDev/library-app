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

class Book {
    constructor(title, author, numOfPages, status, img){
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.status = status;
        this.img = img;
    };

    statusChange(previousSibling) {
        if (this.status === 'Not Finished'){
            this.status = 'Finished';
            previousSibling.innerText = 'Finished';
        } else {
            this.status = 'Not Finished';
            previousSibling.innerText = 'Not Finished';
        };
    };
};

function addBookToLibrary(title, author, numOfPages, status, img) {
    let check = `unchecked="`;
    if (status === false) {
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
            let previousSibling = check.previousElementSibling

            myLibrary[index].statusChange(previousSibling);
        });
    });
};

// test examples
addBookToLibrary('Super Great Book', 'drearydev', 999, false, './example-covers/super-great-book.webp');
addBookToLibrary('Super Great Book', 'drearydev', 999, true, './example-covers/super-great-book.webp');
addBookToLibrary('Super Great Book', 'drearydev', 999, false, './example-covers/super-great-book.webp');
addBookToLibrary('Super Great Book', 'drearydev', 999, true, './example-covers/super-great-book.webp');


addBookBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
    body.style.overflow = 'hidden';
});

formSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const titleInput = document.querySelector('input#title');
    const authorInput = document.querySelector('input#author');
    const numOfPagesInput = document.querySelector('input#num-of-pages');
    const statusInput = document.querySelector('input#read');
    const imgInput = document.querySelector('input#img');

    function validate() {
        let valid = true;
        let inputs = [...document.querySelectorAll('form ul li > input')];

        inputs.forEach(input => {
            input.addEventListener('input', validate);

            if (input.checkValidity()) {
                input.nextElementSibling.innerText = '';
                input.style.borderColor = 'green';
            } else {
                input.nextElementSibling.innerText = input.validationMessage;
                valid = false;
                input.style.borderColor = 'red';
            };
        });

        return valid;
    };

    if (validate()) {
        let title = titleInput.value;
        let author = authorInput.value;
        let numOfPages = numOfPagesInput.value;
        let status = statusInput.checked;
        let img = URL.createObjectURL(imgInput.files[0]);

        formContainer.style.display = 'none';
        body.style.overflow = 'auto';
        addBookToLibrary(title, author, numOfPages, status, img);
    };
});

