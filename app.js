const bookshelf = document.querySelector('#bookshelf');
const form = document.querySelector('#form');

const addBookBtn = document.querySelector('#addbook-btn');
const closeFormBtn = document.querySelector('#close-form');

let myLibrary = [];

class book {
	constructor(author, title, pages, read) {
		this.author = author,
		this.title = title,
		this.pages = pages,
		this.read = read
	}
}

function newBook(author, title, pages, read) {
	const addedBook = new book(author, title, pages, read);
	myLibrary.push(addedBook);
}

function createInfo(book) {
	return `${book.title} by ${book.author} is ${book.pages} pages long. ${book.read ? 'I have read it.' : 'I have not yet read it.'}`;
}

function displayBooks() {
	let lib = myLibrary;
	bookshelf.textContent = '';
	for (i in lib) {
		const bookItem = document.createElement('div');
		const info = document.createElement('p');
		const remove = document.createElement('button');
		const readBtn = document.createElement('button');

		bookItem.classList.add('book-item');
		bookItem.setAttribute('id', i);

		
		info.textContent = createInfo(lib[i]);
		remove.textContent = 'remove';
		readBtn.textContent = 'read';
		info.classList.add('book-info');
		remove.classList.add('button');
		remove.classList.add('small');
		remove.classList.add('delete-btn');
		readBtn.classList.add('button');
		readBtn.classList.add('small');
		readBtn.classList.add('read-btn')

		bookItem.appendChild(info);
		bookItem.appendChild(readBtn);
		bookItem.appendChild(remove);
		bookshelf.appendChild(bookItem);
	}
	listenForItem();
}

function inputBook(form) {
	let author = form.author.value;
	let title = form.title.value;
	let pages = form.pages.value;
	let read = form.read.checked;
	newBook(author, title, pages, read);
	hideForm();
	displayBooks();
	form.author.value = '';
	form.title.value = '';
	form.pages.value = null;
	form.read.checked = false;
}

function listenForItem() {
	const deleteBtns = Array.from(document.querySelectorAll('.delete-btn'));
	const readBtns = Array.from(document.querySelectorAll('.read-btn'));
	
	deleteBtns.forEach(button => button.addEventListener('click', removeBook));
	readBtns.forEach(button => button.addEventListener('click', readBook));
}

function removeBook(e) {
	let ind = e.target.parentNode.id;
	myLibrary.splice(ind, 1);
	displayBooks();
}

function readBook(e) {
	let ind = e.target.parentNode.id;
	if (myLibrary[ind].read) {
		myLibrary[ind].read = false;
	}
	else {
		myLibrary[ind].read = true;
	}
	displayBooks();
}

function showForm() {
	form.classList.remove('hidden');
	bookshelf.classList.add('hidden');
	addBookBtn.classList.add('hidden'); 
}

function hideForm() {
	form.classList.add('hidden');
	addBookBtn.classList.remove('hidden');
	bookshelf.classList.remove('hidden');
}

addBookBtn.addEventListener('click', showForm);
closeFormBtn.addEventListener('click', hideForm);

newBook('Samuel Delaney', 'Nova', 241, false);
newBook('Karl Marx', 'Das Kapital', 1134, true);
newBook('Mary Shelley', 'Frankenstein', 280, false);

displayBooks();