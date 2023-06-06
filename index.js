const bookList = document.getElementById('bookList');
const books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.author}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      removeBook(index);
    });

    li.appendChild(removeButton);
    bookList.appendChild(li);
  });
}

// eslint-disable-next-line no-unused-vars
function addBook() {
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');

  const title = titleInput.value;
  const author = authorInput.value;

  if (title === '' || author === '') {
    return;
  }

  const book = { title, author };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  displayBooks();

  titleInput.value = '';
  authorInput.value = '';
}

function removeBook(index) {
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));

  displayBooks();
}

displayBooks();