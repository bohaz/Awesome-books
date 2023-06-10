// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookListElement = document.getElementById('bookList');
    this.titleInputElement = document.getElementById('titleInput');
    this.authorInputElement = document.getElementById('authorInput');
    this.listLinkElement = document.getElementById('listLink');
    this.addLinkElement = document.getElementById('addLink');
    this.contactLinkElement = document.getElementById('contactLink');
    this.listSectionElement = document.getElementById('listSection');
    this.addSectionElement = document.getElementById('addSection');
    this.contactSectionElement = document.getElementById('contactSection');

    this.displayBooks();

    this.listLinkElement.addEventListener('click', () => {
      this.showSection('list');
    });

    this.addLinkElement.addEventListener('click', () => {
      this.showSection('add');
    });

    this.contactLinkElement.addEventListener('click', () => {
      this.showSection('contact');
    });

    document.getElementById('addButton').addEventListener('click', () => {
      this.addBook();
    });
  }

  displayBooks() {
    this.bookListElement.innerHTML = '';

    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.classList.add('book-item');
      li.textContent = `${book.title} by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      li.appendChild(removeButton);
      this.bookListElement.appendChild(li);
    });
  }

  addBook() {
    const title = this.titleInputElement.value;
    const author = this.authorInputElement.value;

    if (title === '' || author === '') {
      return;
    }

    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));

    this.displayBooks();

    this.titleInputElement.value = '';
    this.authorInputElement.value = '';
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));

    this.displayBooks();
  }

  showSection(section) {
    this.listSectionElement.style.display = 'none';
    this.addSectionElement.style.display = 'none';
    this.contactSectionElement.style.display = 'none';

    if (section === 'list') {
      this.listSectionElement.style.display = 'block';
    } else if (section === 'add') {
      this.addSectionElement.style.display = 'block';
    } else if (section === 'contact') {
      this.contactSectionElement.style.display = 'block';
    }
  }
}

const bookCollection = new BookCollection();
bookCollection.displayBooks();
