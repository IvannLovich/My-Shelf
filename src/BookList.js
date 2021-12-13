import React from 'react';
import Book from './Book';

const BookList = ({
  books,
  shelf,
  shelvesTiles,
  onBookStatusChange,
  history,
}) => {
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelvesTiles}</h2>
      </div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter((book) => book.shelf === shelf)
            .map((bookFiltered, index) => {
              return (
                <Book
                  key={index}
                  bookFiltered={bookFiltered}
                  onBookStatusChange={onBookStatusChange}
                  history={history}
                />
              );
            })}
        </ol>
      </div>
    </>
  );
};

export default BookList;
