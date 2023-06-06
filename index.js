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
}

const bookCollection = new BookCollection();
bookCollection.displayBooks();