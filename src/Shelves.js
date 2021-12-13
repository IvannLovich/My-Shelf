import React from 'react';
import BookList from './BookList';
import './Shelves.css';
import SearchButton from './SearchButton';

const bookStatus = {
  read: 'Read',
  wantToRead: 'Want to Read',
  currentlyReading: 'Currently Reading',
};

const Shelves = ({ books, onBookStatusChange, history }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.entries(bookStatus).map(([key, value], index) => (
            <BookList
              key={index}
              books={books}
              shelf={key}
              shelvesTiles={value}
              onBookStatusChange={onBookStatusChange}
              history={history}
            />
          ))}
        </div>
      </div>
      <SearchButton history={history} />
    </div>
  );
};

export default Shelves;
