var myLibrary = []

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary() {
	let title = document.getElementById("title").value;
	let author = document.getElementById("author").value;
	let pages = document.getElementById("pages").value;
	let read = document.getElementById("read").checked;
	if (title != "" && author != "" && pages > 0) {
		myLibrary.push(new Book(title, author, pages, read));
	}
	render();
	save();
}

function render() {
	var list = document.getElementById("list")
	while (list.children[1]) {
		list.removeChild(list.children[1]);
	}
	for (i = 0; i < myLibrary.length; i++) {
		var list = document.getElementById("list");
		var tr = document.createElement("tr");
		var tdName = document.createElement("td");
		var tdAuthor = document.createElement("td");
		var tdPages = document.createElement("td");
		var tdRead = document.createElement("td");
		tr.className = "entry"
		tdName.className = "name"
		tdAuthor.className = "author"
		tdPages.className = "pages"
		tdRead.className = "read"
		var name = document.createTextNode(myLibrary[i].title)
		var author = document.createTextNode(myLibrary[i].author)
		var pages = document.createTextNode(myLibrary[i].pages)
		var read = document.createTextNode(myLibrary[i].read)
		list.appendChild(tr);
		tr.appendChild(tdName);
		tr.appendChild(tdAuthor);
		tr.appendChild(tdPages);
		tr.appendChild(tdRead);
		tdName.appendChild(name);
		tdAuthor.appendChild(author);
		tdPages.appendChild(pages);
		tdRead.appendChild(read);
	}
	if (myLibrary.length == 0) {
		var list = document.getElementById("list");
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.colSpan = 4;
		var node = "There are no books in your Library!"
		var empty = document.createTextNode(node);
		list.appendChild(tr);
		tr.appendChild(td);
		td.appendChild(empty);
	}
}

function clearLibrary() {
	myLibrary = []
	var list = document.getElementById("list")
	while (list.children[1]) {
		list.removeChild(list.children[1]);
	}
	render();
	save();
}

function save() {
	localStorage.clear();
	for (var i = 0; i < myLibrary.length; i++) {
		localStorage.setItem(`title${i}`, myLibrary[i].title)
		localStorage.setItem(`author${i}`, myLibrary[i].author)
		localStorage.setItem(`pages${i}`, myLibrary[i].pages)
		localStorage.setItem(`read${i}`, myLibrary[i].read)
	}
}

function load() {
	for (var i = 0; i < ( localStorage.length / 4 ); i++) {
		var book = new Book(localStorage.getItem(`title${i}`),
												localStorage.getItem(`author${i}`),
												localStorage.getItem(`pages${i}`),
												localStorage.getItem(`read${i}`));
		myLibrary.push(book);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	load();
	render();
});