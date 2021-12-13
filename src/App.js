import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Shelves from './Shelves.js';
import SearchPage from './SearchPage.js';
import './App.css';

const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const history = useHistory();

  useEffect(
    () => {
      BooksAPI.getAll().then((res) => {
        res.forEach((bk) => {
          setBooks((currentState) => {
            currentState = [...currentState, bk];
            return currentState;
          });
        });
      });
    },
    [setBooks],
  );

  const bookStatusChange = (e, bookElement) => {
    const bookShelfChanged = books.findIndex((bk) => bk === bookElement);

    books.forEach((book, index) => {
      if (index === bookShelfChanged) {
        book.shelf = e.target.value;
      }
    });
    BooksAPI.update(bookElement, e.target.value);
  };

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => (
          <Shelves
            books={books}
            onBookStatusChange={bookStatusChange}
            history={history}
          />
        )}
      />
      <Route
        exact
        path="/search"
        render={() => (
          <SearchPage
            books={books}
            onBookStatusChange={bookStatusChange}
            history={history}
          />
        )}
      />
    </div>
  );
};

BooksApp.prototype = {
  books: PropTypes.array.isRequired,
  onBookStatusChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BooksApp;
